import { Component } from "@angular/core";
import { BannerMessage } from "./messageBanner.model";
import { MessageBannerService } from "./messageBannerService";

@Component({
    selector: "message-banner",
    templateUrl: "./messageBanner.component.html"
})
export class MessageBannerComponent {
    public lastMessage: BannerMessage;

    constructor(messageService: MessageBannerService) { 
        messageService
        .messages
        .subscribe(m => this.lastMessage = m);
    }

    clearMessage() {
        console.warn('clear message event listener called')
        this.lastMessage = null;
    }
}