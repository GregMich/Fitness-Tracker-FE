import { Injectable, Inject, InjectionToken } from "@angular/core";
// TODO configure target specific file replacements
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { StatsModel } from "../stats/stats.model";
import { catchError } from "rxjs/operators";

@Injectable()
export class RestfulDataSource {

    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.backendApiUrl;
    }

    getStatsData(): Observable<StatsModel> {
        // TODO remove this hardcoded part
        console.debug(`getStatsData invoked, sending request to backend: ${this.url}/stats/2`)
        return this.http.get<StatsModel>(`${this.url}/stats/2`);
        // TODO make this more generalized
            // .pipe(catchError((error: Response) => throwError(`Error: ${error.status} 
            // ${error.statusText}`)));
    }

    updateStatsData(statsModel: StatsModel): Observable<StatsModel> {
        return this.http.put<StatsModel>(
            `${this.url}/stats/${statsModel.id}`, 
            statsModel);
    }

    createStatsData(statsModel: StatsModel): Observable<StatsModel> {
        return this.http.post<StatsModel>(
            `${this.url}/stats/`, 
            statsModel);
    }
}