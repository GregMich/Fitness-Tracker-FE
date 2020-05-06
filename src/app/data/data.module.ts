import { NgModule } from "@angular/core";
import { Repo } from "./repo.model";
import { HttpClientModule } from "@angular/common/http";
import { RestfulDataSource } from "./restful.datasource";


@NgModule({
    imports: [HttpClientModule],
    providers: [Repo, RestfulDataSource]
})
export class DataModule { }