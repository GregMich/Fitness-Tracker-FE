import { Component, OnInit } from '@angular/core';
import { StatsModel } from './stats.model';
import { RestfulDataSource } from "../data/restful.datasource";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

    private bmi;
    public stats;
  constructor(private dataSource: RestfulDataSource) { 
  }

  ngOnInit() {
    console.log("STATS COMPONENT INITIALIZED");
    this.dataSource.getStatsData()
      .subscribe(data => this.stats = data);
  }

  private calculateBmi() {
    this.bmi = 
      (((this.stats.weight) / ((this.stats.heightInch) + (this.stats.heightFeet * 12)) ** 2)
      * 702).toFixed(2);
    }

    get bmiDisplayString() {
      this.calculateBmi();
      if (this.bmi < 18.5) {
        return this.bmi + " (Underweight)"
      } else if (this.bmi < 25 && this.bmi >= 18.5){
        return this.bmi + " (Normal)"
      } else if (this.bmi < 30 && this.bmi >= 25) {
        return this.bmi + " (Overweight)"
      } else if (this.bmi >= 30) {
        return this.bmi + " (Obese)"
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


  }