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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
