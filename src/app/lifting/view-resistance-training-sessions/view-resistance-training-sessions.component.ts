import { Component, OnInit } from '@angular/core';
import { ResistanceTrainingSessionModel, ExcerciseModel, SetModel } from "./resistance-training-session.model";
import { RestfulDataSource } from "../../data/restful.datasource";
import { DatePipe } from "@angular/common";
import { MessageBannerService } from 'src/app/MessageBanner/messageBannerService';
import { BannerMessage, BannerMessageType } from 'src/app/MessageBanner/messageBanner.model';

@Component({
  selector: 'view-resistance-training-sessions',
  templateUrl: './view-resistance-training-sessions.component.html',
  styleUrls: ['./view-resistance-training-sessions.component.css']
})
export class ViewResistanceTrainingSessionsComponent implements OnInit {

  public resistanceTrainingSessions: ResistanceTrainingSessionModel[] = [];

  public trainingSessionsLoaded: boolean = false;
  
  public serverError: boolean = false;

  constructor(private dataSource: RestfulDataSource,
    private messageBannerService: MessageBannerService) { }

  ngOnInit(): void {
    this.loadResistanceTrainingSessions();
  }

  private loadResistanceTrainingSessions() {
    this.trainingSessionsLoaded = false;
    this.dataSource.getResistanceTrainingSessionData()
    .subscribe(data => {
      this.resistanceTrainingSessions = [];
      data.forEach(_ => {
        this.resistanceTrainingSessions.push(
          new ResistanceTrainingSessionModel(
            _.resistanceTrainingSessionId, 
            _.trainingSessionDate, 
            _.userId, 
            _.excercises,
            false))
      })
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
    console.log(`onClickEditTrainingEventListener was called with id: ${trainingSessionId}`);
    this.resistanceTrainingSessions.find(_ => _.resistanceTrainingSessionId == trainingSessionId).markedDelete = true;
    this.dataSource.deleteResistanceTrainingSession(trainingSessionId)
      .subscribe(_ => {
        var index = this.resistanceTrainingSessions.findIndex(_ => _.resistanceTrainingSessionId == trainingSessionId);
        this.resistanceTrainingSessions.splice(index, 1);
        // this.loadResistanceTrainingSessions();
        this.messageBannerService.reportMessage(new
          BannerMessage('Training session was successfully deleted', BannerMessageType.info))
      },error => {
        console.error(error);
        this.resistanceTrainingSessions.find(_ => _.resistanceTrainingSessionId == trainingSessionId).markedDelete = false;
        this.messageBannerService.reportMessage(new BannerMessage(
          'There was an error deleting this training session', BannerMessageType.error
        ))
      })
  }

  onClickEditTrainingSession(trainingSessionId: number) {

  }

  getTrainingSessionDeleteButtonClassMap(trainingSessionId: number) {
    console.log(`DETERMINING CLASS MAP FOR: ${trainingSessionId}`)
    var isMarked = this.resistanceTrainingSessions.find(_ => _.resistanceTrainingSessionId == trainingSessionId).markedDelete;
    return {
      'fas fa-trash': !isMarked,
      'fas fa-spinner fa-spin': isMarked
    }
  }
}
