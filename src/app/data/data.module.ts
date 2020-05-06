import { NgModule } from "@angular/core";import { HttpClientModule } from "@angular/common/http";
import { RestfulDataSource } from "./restful.datasource";


@NgModule({
    imports: [HttpClientModule],
    providers: [RestfulDataSource]
})
export class DataModule { }