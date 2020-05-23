import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MessageBannerService } from "./messageBannerService";
import { MessageBannerComponent } from "./messageBanner.component";

@NgModule({
    imports: [BrowserModule],
    declarations: [MessageBannerComponent],
    exports: [MessageBannerComponent],
    providers: [MessageBannerService]
})
export class MessageBannerModule { }