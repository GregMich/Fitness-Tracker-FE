import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { LiftingComponent } from './lifting/lifting.component';
import { CardioComponent } from './cardio/cardio.component';
import { GeneralStatsComponent } from './stats/generalStats/generalStats.component';
import { GoalsComponent } from './goals/goals.component';
import { ProgressComponent } from './progress/progress.component';
import { RestfulDataSource } from "./data/restful.datasource";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// for Http Request loading bars
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";
import { StatsModule } from './stats/stats.module';
import { AuthComponent } from "./Auth/auth.component";
import { AuthGuard } from "./Auth/authGuard";
import { AuthService } from './Auth/auth.service';
import { AuthTokenInterceptor } from "./Auth/token.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LiftingComponent,
    CardioComponent,
    GoalsComponent,
    ProgressComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    ReactiveFormsModule,
    StatsModule
  ],
  providers: [
    RestfulDataSource, 
    AuthService, 
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
