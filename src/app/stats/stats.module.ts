import { NgModule } from "@angular/core";
import { GeneralStatsComponent } from './generalStats/generalStats.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { StatsComponent } from "./stats.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule, 
        ReactiveFormsModule,
        HttpClientModule
    ],
    declarations: [GeneralStatsComponent, StatsComponent]
})
export class StatsModule { }