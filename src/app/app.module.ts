import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { LiftingComponent } from './lifting/lifting.component';
import { CardioComponent } from './cardio/cardio.component';
import { StatsComponent } from './stats/stats.component';
import { GoalsComponent } from './goals/goals.component';
import { ProgressComponent } from './progress/progress.component';
import { RestfulDataSource } from "./data/restful.datasource";
import { HttpClientModule } from "@angular/common/http";

// for Http Request loading bars
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";

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
    HttpClientModule,
    LoadingBarHttpClientModule,
    ReactiveFormsModule
  ],
  providers: [RestfulDataSource],
  bootstrap: [AppComponent]
})
export class AppModule { }
