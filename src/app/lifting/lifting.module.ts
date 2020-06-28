import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AddResistanceTrainingSessionComponent } from './add-resistance-training-session/add-resistance-training-session.component';
import { ViewResistanceTrainingSessionsComponent } from './view-resistance-training-sessions/view-resistance-training-sessions.component';
import { LiftingComponent } from './lifting.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewResistanceTrainingSessionService } from './add-resistance-training-session/new-resistance-training-session-service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AddResistanceTrainingSessionComponent,
        ViewResistanceTrainingSessionsComponent,
        LiftingComponent
    ],
    providers: [
        NewResistanceTrainingSessionService
    ]
})
export class LiftingModule { }