import { Component, OnInit } from '@angular/core';
import { ResistanceTrainingSessionModel, ExcerciseModel, SetModel } from "./resistance-training-session.model";
import { RestfulDataSource } from "../../data/restful.datasource";
import { DatePipe } from "@angular/common";
import { MessageBannerService } from 'src/app/MessageBanner/messageBannerService';
import { BannerMessage, BannerMessageType } from 'src/app/MessageBanner/messageBanner.model';
import { NewResistanceTrainingSessionService } from '../add-resistance-training-session/new-resistance-training-session-service';

@Component({
  selector: 'view-resistance-training-sessions',
  templateUrl: './view-resistance-training-sessions.component.html',
  styleUrls: ['./view-resistance-training-sessions.component.css']
})
export class ViewResistanceTrainingSessionsComponent implements OnInit {

  // resistance training sessions for the current user
  public resistanceTrainingSessions: ResistanceTrainingSessionModel[] = [];
  // indicates that an attempt was made to load the resistance training sessions for this user, whether successfully or otherwise
  public trainingSessionsLoaded: boolean = false;
  // indicates an error communicating with the backend server
  public serverError: boolean = false;

  sortingOptions = {
    "DateEarliest": "Date (Earliest)",
    "DateLatest": "Date (Latest)"
  }

  public sortOption = this.sortingOptions.DateLatest;

  constructor(private dataSource: RestfulDataSource,
    private messageBannerService: MessageBannerService,
    // service for detecting newly added resistance training sessions from external components
    newlyAddedResistanceTrainingSessionService: NewResistanceTrainingSessionService) { 

      // new resistance training session was reported
      newlyAddedResistanceTrainingSessionService
      .newTrainingSessions
      .subscribe(t => {
        console.log('new resistance training session was detected from external source');
        console.log(t);
        this.resistanceTrainingSessions.push(t);
        this.sortTrainingSessions();
      })
    }

  ngOnInit(): void {
    this.loadResistanceTrainingSessions();
  }

  private loadResistanceTrainingSessions() {

    this.trainingSessionsLoaded = false;
    this.dataSource.getResistanceTrainingSessionData()
     .subscribe(data => {
      this.resistanceTrainingSessions = [];
      data.forEach(_ => {
        // we modify the structure of the data with addtional fields that do not exist on
        // the backend (markedDelete in particular)
        this.resistanceTrainingSessions.push(
          new ResistanceTrainingSessionModel(
            _.resistanceTrainingSessionId, 
            _.trainingSessionDate, 
            _.userId, 
            _.excercises,
            false))
      })
      this.sortTrainingSessions();
      this.trainingSessionsLoaded = true;
    },
    error => {
      console.log(error);
      this.trainingSessionsLoaded = true;
      this.messageBannerService.reportMessage(
        new BannerMessage("There was an error loading your training sessions", BannerMessageType.error));
    })
  }

  calculateTotal(excercise: ExcerciseModel) {
    var total = 0;
    excercise.sets.forEach(_ => total += _.weight * _.reps );
    return total;
  }

  onClickDeleteTrainingSession(trainingSessionId: number) {
    console.log(`attempting to delete resistance training session with id: ${trainingSessionId}`);
    this.resistanceTrainingSessions.find(_ => _.resistanceTrainingSessionId == trainingSessionId).markedDelete = true;
    this.dataSource.deleteResistanceTrainingSession(trainingSessionId)
      .subscribe(_ => {
        var index = this.resistanceTrainingSessions.findIndex(_ => _.resistanceTrainingSessionId == trainingSessionId);
        this.resistanceTrainingSessions.splice(index, 1);
        this.messageBannerService.reportMessage(new
          BannerMessage('Training session was successfully deleted', BannerMessageType.success))
        this.sortTrainingSessions();
      },error => {
        console.error(error);
        this.resistanceTrainingSessions.find(_ => _.resistanceTrainingSessionId == trainingSessionId).markedDelete = false;
        this.messageBannerService.reportMessage(new BannerMessage(
          'There was an error deleting this training session', BannerMessageType.error
        ))
      })
  }

  // TODO should push into add resistance training session form with prepopulated data
  onClickEditTrainingSession(trainingSessionId: number) {

  }

  getTrainingSessionDeleteButtonClassMap(trainingSessionId: number) {
    var isMarked = this.resistanceTrainingSessions.find(_ => _.resistanceTrainingSessionId == trainingSessionId).markedDelete;
    return {
      'fas fa-trash': !isMarked,
      'fas fa-spinner fa-spin': isMarked
    }
  }

  sortTrainingSessions() {
    switch (this.sortOption) {

      case this.sortingOptions.DateEarliest:
        this.resistanceTrainingSessions.sort( (a: ResistanceTrainingSessionModel, b: ResistanceTrainingSessionModel)=> { 
          return new Date(a.trainingSessionDate).getTime() - new Date(b.trainingSessionDate).getTime();
        });
        break;

      case this.sortingOptions.DateLatest:
        this.resistanceTrainingSessions.sort( (a: ResistanceTrainingSessionModel, b: ResistanceTrainingSessionModel)=> { 
          return new Date(b.trainingSessionDate).getTime() - new Date(a.trainingSessionDate).getTime();
        });
        break;
    }
  }

  onChangeSortOption(sortOptionKey) {
    console.log(`changing sort option to: ${sortOptionKey}`);
    this.sortOption = this.sortingOptions[sortOptionKey];
    console.log(`New sort optin: ${this.sortOption}`);
    this.sortTrainingSessions();
  }
}