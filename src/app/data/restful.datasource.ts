import { Injectable, Inject, InjectionToken } from "@angular/core";
// TODO configure target specific file replacements
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { StatsModel } from "../stats/stats.model";

@Injectable()
export class RestfulDataSource {

    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.backendApiUrl;
    }

    getStatsData(): Observable<StatsModel> {
        // TODO remove this hardcoded part
        console.debug(`getStatsData invoked, sending request to backend: ${this.url}/stats/1`)
        return this.http.get<StatsModel>(`${this.url}/stats/1`);
    }

    updateStatsData(statsModel: StatsModel): Observable<StatsModel> {
        return this.http.put<StatsModel>(
            `${this.url}/stats/${statsModel.id}`, 
            statsModel);
    }

}