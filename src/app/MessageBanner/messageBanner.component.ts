import { Component } from "@angular/core";
import { BannerMessage, BannerMessageType } from "./messageBanner.model";
import { MessageBannerService } from "./messageBannerService";
import { trigger, state, transition, animate, style } from "@angular/animations";

@Component({
    selector: "message-banner",
    templateUrl: "./messageBanner.component.html",
    animations: [
        trigger('simpleFadeAnimation', [
            state('in', style({ opacity: 1})),
            transition(':enter', [
                style({opacity: 0}),
                animate(300)
            ]),
            transition(':leave',
                animate(300, style({opacity: 0})))
        ])
    ]
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