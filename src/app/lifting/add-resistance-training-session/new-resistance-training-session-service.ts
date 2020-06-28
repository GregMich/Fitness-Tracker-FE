import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ResistanceTrainingSessionModel } from '../view-resistance-training-sessions/resistance-training-session.model';

@Injectable()
export class NewResistanceTrainingSessionService {

    private subject = new Subject<ResistanceTrainingSessionModel>();

    reportNewResistanceTrainingSession(trainingSession: ResistanceTrainingSessionModel) {
        console.log('New Resistance Training Session was created');
        this.subject.next(trainingSession);
    }

    get newTrainingSessions(): Observable<ResistanceTrainingSessionModel> {
        return this.subject;
    }
}