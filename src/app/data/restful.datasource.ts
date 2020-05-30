import { Injectable, Inject, InjectionToken } from "@angular/core";
// TODO configure target specific file replacements
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { GeneralStatsModel } from "../stats/generalStats/generalStats.model";
import { ResistanceTrainingSessionModel } from "../lifting/view-resistance-training-sessions/resistance-training-session.model"
import { catchError } from "rxjs/operators";
import { AuthService } from "../Auth/auth.service"; 
import { retry } from "rxjs/operators"

@Injectable()
export class RestfulDataSource {

    private url: string;

    constructor(private http: HttpClient,
        private auth: AuthService) {
        this.url = environment.backendApiUrl;
    }

    getStatsData(): Observable<GeneralStatsModel> {
        
        const url = `${this.url}/User/${this.auth.getUserId()}/Stats/`
        console.log('Sending GET request to');
        console.log(url)
        return this.http.get<GeneralStatsModel>(url)
        .pipe(
            retry(1)
        );
    }

    updateStatsData(statsModel: GeneralStatsModel): Observable<GeneralStatsModel> {
        const url = `${this.url}/User/${this.auth.getUserId()}/Stats/${statsModel.statsId}`
        console.log('Sending PUT request to');
        console.log(url);
        console.log('With updated model:');
        console.log(statsModel);
        return this.http.put<GeneralStatsModel>(
            url, 
            statsModel);
    }

    createStatsData(statsModel: GeneralStatsModel): Observable<GeneralStatsModel> {
        const url = `${this.url}/User/${this.auth.getUserId()}/Stats/`
        console.log('Sending PUT request to');
        console.log(url);
        console.log('With updated model:');
        console.log(statsModel);
        return this.http.post<GeneralStatsModel>(
            url, 
            statsModel);
    }

    getResistanceTrainingSessionData(): Observable<ResistanceTrainingSessionModel[]> {
        const url = `${this.url}/User/${this.auth.getUserId()}/ResistanceTrainingSessions/`;
        console.log('Sending GET request to')
        console.log(url);
        return this.http.get<ResistanceTrainingSessionModel[]>(url)
         .pipe(
             retry(1)
         );
    }

    deleteResistanceTrainingSession(resistanceTrainingSessionId): Observable<void> {
        const url = `${this.url}/User/${this.auth.getUserId()}/ResistanceTrainingSessions/${resistanceTrainingSessionId}`;
        console.log('Sending DELETE request to')
        console.log(url);
        return this.http.delete<void>(url);
    }
}