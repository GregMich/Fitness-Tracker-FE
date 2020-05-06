import { Injectable } from "@angular/core";
import { StatsModel } from "../stats/stats.model";
import { Observable } from "rxjs";
import { RestfulDataSource } from "./restful.datasource";
@Injectable()
export class Repo {
    private stats: StatsModel;
    private loaded: boolean = false;
    
    constructor(private dataSource: RestfulDataSource) { }

    loadStats() {
        this.loaded = true;
        this.dataSource.getStatsData()
        .subscribe(_ => {
            this.stats = _;
            console.log(this.stats);
        });
    }

    getStats(): StatsModel {
        if (!this.loaded) {
            this.loadStats();
        }
        return this.stats;
    }
}