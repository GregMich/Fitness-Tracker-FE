import { Injectable, Inject, InjectionToken } from "@angular/core";
// TODO configure target specific file replacements
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { GeneralStatsModel } from "../stats/generalStats/generalStats.model";
import { catchError } from "rxjs/operators";

@Injectable()
export class RestfulDataSource {

    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.backendApiUrl;
    }

    getStatsData(): Observable<GeneralStatsModel> {
        // TODO remove this hardcoded part
        console.debug(`getStatsData invoked, sending request to backend: ${this.url}/Stats/1`)
        return this.http.get<GeneralStatsModel>(`${this.url}/Stats/1`);
        // TODO make this more generalized
            // .pipe(catchError((error: Response) => throwError(`Error: ${error.status} 
            // ${error.statusText}`)));
    }

    updateStatsData(statsModel: GeneralStatsModel): Observable<GeneralStatsModel> {
        return this.http.put<GeneralStatsModel>(
            `${this.url}/stats/${statsModel.id}`, 
            statsModel);
    }

    createStatsData(statsModel: GeneralStatsModel): Observable<GeneralStatsModel> {
        return this.http.post<GeneralStatsModel>(
            `${this.url}/stats/`, 
            statsModel);
    }
}