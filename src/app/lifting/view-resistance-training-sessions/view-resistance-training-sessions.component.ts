import { Component, OnInit } from '@angular/core';
import { ResistanceTrainingSessionModel, ExcerciseModel, SetModel } from "./resistance-training-session.model";
import { RestfulDataSource } from "../../data/restful.datasource";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'view-resistance-training-sessions',
  templateUrl: './view-resistance-training-sessions.component.html',
  styleUrls: ['./view-resistance-training-sessions.component.css']
})
export class ViewResistanceTrainingSessionsComponent implements OnInit {

  public resistanceTrainingSessions: ResistanceTrainingSessionModel[] = [];

  public trainingSessionsLoaded: boolean = false;
  
  public serverError: boolean = false;

  constructor(private dataSource: RestfulDataSource) { }

  ngOnInit(): void {
    this.dataSource.getResistanceTrainingSessionData()
     .subscribe(data => {
       this.resistanceTrainingSessions = data;
       this.trainingSessionsLoaded = true;
       console.log(`callback from getResistanceTrainingSessionsObservable: ${JSON.stringify(data, null, " ")}`);
       console.log(`current training sessions data: ${JSON.stringify(this.resistanceTrainingSessions, null, " ")}`)
     },
     error => {
       console.log(error);
     })
  }

  calculateTotal(excercise: ExcerciseModel) {
    var total = 0;
    excercise.sets.forEach(_ => total += _.weight * _.reps );
    return total;
  }

  onClickDeleteTrainingSession(trainingSessionId: number) {
    console.log(`onClickDeleteTrainingEventListener was called with id: ${trainingSessionId}`);
  }

  onClickEditTrainingSession(trainingSessionId: number) {
    console.log(`onClickEditTrainingEventListener was called with id: ${trainingSessionId}`);
  }

}
