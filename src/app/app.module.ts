import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { LiftingComponent } from './lifting/lifting.component';
import { CardioComponent } from './cardio/cardio.component';
import { StatsComponent } from './stats/stats.component';
import { GoalsComponent } from './goals/goals.component';
import { ProgressComponent } from './progress/progress.component';
import { Repo } from "./data/repo.model";
import { RestfulDataSource } from "./data/restful.datasource";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LiftingComponent,
    CardioComponent,
    StatsComponent,
    GoalsComponent,
    ProgressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [Repo, RestfulDataSource],
  bootstrap: [AppComponent]
})
export class AppModule { }
