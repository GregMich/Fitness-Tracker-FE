import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { LiftingComponent } from "./lifting/lifting.component";
import { CardioComponent } from "./cardio/cardio.component";
import { GoalsComponent } from "./goals/goals.component";
import { ProgressComponent } from "./progress/progress.component";
import { StatsComponent } from './stats/stats.component';
import { AuthComponent } from './Auth/auth.component';
import { AuthGuard } from './Auth/authGuard';

const routes: Routes = [
  {
    path: "auth",
    component: AuthComponent
  },
  {
    path: "lifting",
    component: LiftingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "cardio",
    component: CardioComponent
  },
  {
    path: "stats",
    component: StatsComponent
  },
  {
    path: "goals",
    component: GoalsComponent
  },
  {
    path: "progress",
    component: ProgressComponent
  },
  {
    path: "**",
    component: DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
