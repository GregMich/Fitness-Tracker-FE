import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { CaloriesComponent } from "./calories.component";
import { CalorieTrackerComponent } from './calorie-tracker/calorie-tracker.component';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [CalorieTrackerComponent, CaloriesComponent]
}) export class CaloriesModule { }