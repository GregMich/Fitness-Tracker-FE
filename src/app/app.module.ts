import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { LiftingComponent } from './lifting/lifting.component';
import { CardioComponent } from './cardio/cardio.component';
import { GoalsComponent } from './goals/goals.component';
import { ProgressComponent } from './progress/progress.component';
import { RestfulDataSource } from "./data/restful.datasource";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MessageBannerModule } from "./MessageBanner/messageBanner.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// for Http Request loading bars
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";
import { StatsModule } from './stats/stats.module';
import { CaloriesModule } from "./calories/calories.module";
import { AuthComponent } from "./Auth/auth.component";
import { AuthGuard } from "./Auth/authGuard";
import { AuthService } from './Auth/auth.service';
import { AuthTokenInterceptor } from "./Auth/token.interceptor";
import { UnauthorizedErrorInterceptor } from "./Auth/unauthorizedInterceptor";
import { AddResistanceTrainingSessionComponent } from './lifting/add-resistance-training-session/add-resistance-training-session.component';
import { ViewResistanceTrainingSessionsComponent } from './lifting/view-resistance-training-sessions/view-resistance-training-sessions.component';
import { LiftingModule } from './lifting/lifting.module';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardioComponent,
    GoalsComponent,
    ProgressComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    ReactiveFormsModule,
    StatsModule,
    MessageBannerModule,
    BrowserAnimationsModule,
    CaloriesModule,
    LiftingModule
  ],
  providers: [
    RestfulDataSource, 
    AuthService, 
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
