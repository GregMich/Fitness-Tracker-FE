import { Component, OnInit } from '@angular/core';
import { StatsModel } from './stats.model';
import { RestfulDataSource } from "../data/restful.datasource";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

    private bmi: number;
    public stats: StatsModel;
    public statsLoaded: boolean = false;

    statsForm : FormGroup;

  constructor(private dataSource: RestfulDataSource) { 
  }

  ngOnInit() {
    console.debug("stats component was initialized");
    this.dataSource.getStatsData()
      .subscribe(data => {
        this.stats = data;
        console.debug(`callback from getStatsDataObservable: ${JSON.stringify(data, null, " ")}`);

        this.statsForm = new FormGroup({
          "weight": new FormControl(this.stats.weight),
          "weightUnit": new FormControl(this.stats.weightUnit),
          "heightFeet": new FormControl(this.stats.heightFeet),
          "heightInch": new FormControl(this.stats.heightInch),
          "age": new FormControl(this.stats.age),
          "bodyfatPercentage": new FormControl(this.stats.bodyfatPercentage)
        });

        this.statsLoaded = true;});
  }

  private calculateBmi() {
    this.bmi = 
      (((this.stats.weight) / ((this.stats.heightInch) + (this.stats.heightFeet * 12)) ** 2)
      * 702);
    }

    get bmiDisplayString() {
      this.calculateBmi();
      if (this.bmi < 18.5) {
        return this.bmi.toFixed(2) + " (Underweight)"
      } else if (this.bmi < 25 && this.bmi >= 18.5){
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

    onGeneralStatsSubmit() {
      console.debug("OnGeneralStatsClick event listener");
      console.warn(this.statsForm.value);
      let updatedStatsModel = new StatsModel(
        this.stats.id,
        this.stats.userId,
        this.statsForm.value['weight'],
        this.statsForm.value['weightUnit'],
        this.statsForm.value['heightFeet'],
        this.statsForm.value['heightInch'],
        this.statsForm.value['age'],
        this.statsForm.value['bodyfatPercentage'])
        this.statsLoaded = false;
        this.dataSource.updateStatsData(updatedStatsModel)
          .subscribe(data => {
            this.stats = data;
            this.statsLoaded = true;
          })
    };
  }