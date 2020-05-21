import { Component, OnInit } from '@angular/core';
import { GeneralStatsModel } from './generalStats.model';
import { RestfulDataSource } from "../../data/restful.datasource";
import { FormGroup, FormControl } from "@angular/forms";
import { catchError } from "rxjs/operators";
import { AuthService } from "../../Auth/auth.service";
import { MessageBannerService } from 'src/app/MessageBanner/messageBannerService';
import { BannerMessage, BannerMessageType } from "../../MessageBanner/messageBanner.model";

@Component({
  selector: 'general-stats',
  templateUrl: './generalStats.component.html',
  styleUrls: ['./generalStats.component.css']
})
export class GeneralStatsComponent implements OnInit {

  private bmi: number;
  public stats: GeneralStatsModel;

  // indicates requests have finished attempting to access backend model
  public statsLoaded: boolean = false;
  // a 404 was returned when attempting to access the stats
  public noStatsFound: boolean = false;
  // a 200 returned with the existing stats data
  public existingStatsFound: boolean = false;
  // cancel loading of component due to server communication error
  public serverError: boolean = false;

  statsForm: FormGroup;

  constructor(private dataSource: RestfulDataSource,
    private auth: AuthService,
    private messageBannerService: MessageBannerService) {
  }

  ngOnInit() {
    console.debug("stats component was initialized");
    this.dataSource.getStatsData()
      .subscribe(data => {
        this.stats = data;
        console.debug(`callback from getStatsDataObservable: ${JSON.stringify(data, null, " ")}`);
        console.debug(`current stats data: ${JSON.stringify(this.stats, null, " ")}`)
        this.createStatsFormGroup();
        this.statsLoaded = true;
        this.existingStatsFound = true;
      },
        error => {
          console.log(error);
          if (error.status == 404) {
            this.noStatsFound = true;
            this.statsLoaded = true;
            this.createStatsFormGroup();
          }
          else {
            console.error('There was an error communicating with the backend server');
            this.messageBannerService.reportMessage(
              new BannerMessage('There was an error', BannerMessageType.error)
            )
            this.statsLoaded = true;
            this.serverError = true;
          }
        });
  }

  // TODO consider cleaning this up
  private calculateBmi() {
    this.bmi =
      (((+this.stats.weight) / ((+this.stats.heightInch) + (+this.stats.heightFeet * 12)) ** 2)
        * 702);
    console.debug(`bmi calculated: ${this.bmi}`);
  }

  // TODO move this mess into a method in the StatsModel class
  private createStatsFormGroup() {

    if (this.stats != undefined) {
      this.statsForm = new FormGroup({
        "weight": new FormControl(this.stats.weight),
        "weightUnit": new FormControl(this.stats.weightUnit),
        "heightFeet": new FormControl(this.stats.heightFeet),
        "heightInch": new FormControl(this.stats.heightInch),
        "age": new FormControl(this.stats.age),
        "bodyfatPercentage": new FormControl(this.stats.bodyfatPercentage)
      });
    }
    else {
      this.statsForm = new FormGroup({
        "weight": new FormControl(),
        "weightUnit": new FormControl(),
        "heightFeet": new FormControl(),
        "heightInch": new FormControl(),
        "age": new FormControl(),
        "bodyfatPercentage": new FormControl()
      });
    }
  }

  get bmiDisplayString() {
    this.calculateBmi();
    if (this.bmi < 18.5) {
      return this.bmi.toFixed(2) + " (Underweight)"
    } else if (this.bmi < 25 && this.bmi >= 18.5) {
      return this.bmi.toFixed(2) + " (Normal)"
    } else if (this.bmi < 30 && this.bmi >= 25) {
      return this.bmi.toFixed(2) + " (Overweight)"
    } else if (this.bmi >= 30) {
      return this.bmi.toFixed(2) + " (Obese)"
    } else {
      return "N/A"
    }
  }

  getbmiDisplayStringClassmMap() {
    this.calculateBmi();
    return {
      "text-warning": this.bmi < 18.5 || (this.bmi < 30 && this.bmi >= 25),
      "text-info": this.bmi < 25 && this.bmi >= 18.5,
      "text-danger": this.bmi >= 30
    }
  }

  // TODO move logic for saving stats to a repo or some other kind of service
  onGeneralStatsSubmit() {

    console.debug("OnGeneralStatsClick event listener");
    console.debug(this.statsForm.value);

    if (this.statsLoaded && !this.noStatsFound) {
      // need to perform a PUT to update the model
      console.debug("Updating stats model with PUT request");
      let updatedStatsModel = new GeneralStatsModel(
          this.stats.statsId,
          this.stats.userId,
          +this.statsForm.value['weight'] as number,
          this.statsForm.value['weightUnit'],
          +this.statsForm.value['heightFeet'] as number,
          +this.statsForm.value['heightInch'],
          parseInt(this.statsForm.value['age']),
          +this.statsForm.value['bodyfatPercentage'])
        console.log('UPDATED STATS MODEL');
        console.log(updatedStatsModel);
      this.statsLoaded = false;
      this.existingStatsFound = false;
      this.noStatsFound = false;
      this.dataSource
        .updateStatsData(updatedStatsModel)
        .subscribe(data => {
          console.debug("updateStatsData call back");
          console.log(data);
          this.stats = data;
          this.statsLoaded = true;
          this.existingStatsFound = true;
          this.messageBannerService.reportMessage(
            new BannerMessage('Your stats were updated', BannerMessageType.info)
          )},
          error => {
            console.error(error);
            this.statsLoaded = true;
            this.existingStatsFound = true;
            this.messageBannerService.reportMessage(
              new BannerMessage('There was an error updating your stats, please try again',
              BannerMessageType.error)
            )
          })
    }
    else if (this.noStatsFound) {
      console.log('Creating new General Stats model with POST request');
      let newStatsModel = new GeneralStatsModel(
        0,
        parseInt(this.auth.getUserId()),
        +this.statsForm.value['weight'],
        this.statsForm.value['weightUnit'],
        +this.statsForm.value['heightFeet'],
        +this.statsForm.value['heightInch'],
        +this.statsForm.value['age'],
        +this.statsForm.value['bodyfatPercentage'])
        console.log('new stats model')
        console.log(newStatsModel);
      this.statsLoaded = false;
      this.existingStatsFound = false;
      this.noStatsFound = false;
      this.dataSource
        .createStatsData(newStatsModel)
        .subscribe(data => {
          this.stats = data;
          this.statsLoaded = true;
          this.existingStatsFound = true;
          this.messageBannerService.reportMessage(
            new BannerMessage('Your stats were created', BannerMessageType.info)
          )},
          error => {
            console.error(error);
            this.noStatsFound = true;
            this.statsLoaded = true;
            this.messageBannerService.reportMessage(
              new BannerMessage('There was an error saving your stats, please try again',
              BannerMessageType.error)
            )
          })
    }
  }

  messageClick() {
    this.messageBannerService.reportMessage(new BannerMessage('' + Date.now(), BannerMessageType.info));
  }
}