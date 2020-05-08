import { Component, OnInit } from '@angular/core';
import { GeneralStatsModel } from './generalStats.model';
import { RestfulDataSource } from "../../data/restful.datasource";
import { FormGroup, FormControl } from "@angular/forms";
import { catchError } from "rxjs/operators";

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

  statsForm: FormGroup;

  constructor(private dataSource: RestfulDataSource) {
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
            console.log('There was a 404 error');
            this.noStatsFound = true;
            this.statsLoaded = true;
            this.createStatsFormGroup();
          }
        });
  }

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
          this.stats.id,
          this.stats.userId,
          this.statsForm.value['weight'] as number,
          this.statsForm.value['weightUnit'],
          this.statsForm.value['heightFeet'] as number,
          this.statsForm.value['heightInch'] as number,
          this.statsForm.value['age'] as number,
          this.statsForm.value['bodyfatPercentage'] as number)

      this.statsLoaded = false;
      this.existingStatsFound = false;
      this.noStatsFound = false;
      this.dataSource
        .updateStatsData(updatedStatsModel)
        .subscribe(data => {
          console.debug("updateStatsData call back");
          this.stats = data;
          this.statsLoaded = true;
          this.existingStatsFound = true;})
    }
    else if (this.noStatsFound) {
      console.log('Creating new General Stats model with POST request');
      let newStatsModel = new GeneralStatsModel(
        null,
        10,
        this.statsForm.value['weight'] as number,
        this.statsForm.value['weightUnit'],
        this.statsForm.value['heightFeet'] as number,
        this.statsForm.value['heightInch'] as number,
        this.statsForm.value['age'] as number,
        this.statsForm.value['bodyfatPercentage'] as number)

      this.statsLoaded = false;
      this.existingStatsFound = false;
      this.noStatsFound = false;
      this.dataSource
        .createStatsData(newStatsModel)
        .subscribe(data => {
          this.stats = data;
          this.statsLoaded = true;
          this.existingStatsFound = true;})
    }
  }
}