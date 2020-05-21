import { Component } from "@angular/core";
import { BannerMessage, BannerMessageType } from "./messageBanner.model";
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

    getMessageBannerClassMap() {
        return {
            "alert-danger": this.lastMessage.messageType == BannerMessageType.error,
            "alert-info": this.lastMessage.messageType == BannerMessageType.info
        }
    }
}