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
        console.log("SENDING REQUEST TO SERVER")
        return this.http.get<StatsModel>(`${this.url}/stats`);
    }
}