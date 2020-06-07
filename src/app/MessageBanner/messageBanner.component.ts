import { Component } from "@angular/core";
import { BannerMessage, BannerMessageType } from "./messageBanner.model";
import { MessageBannerService } from "./messageBannerService";
import { trigger, state, transition, animate, style } from "@angular/animations";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "message-banner",
    templateUrl: "./messageBanner.component.html",
    // animations: [
    //     trigger('simpleFadeAnimation', [
    //         state('in', style({ opacity: 1})),
    //         transition(':enter', [
    //             style({opacity: 0}),
    //             animate(300)
    //         ]),
    //         transition(':leave',
    //             animate(300, style({opacity: 0})))
    //     ])
    // ]
})
export class MessageBannerComponent {
    public toastMessage: BannerMessage;

    constructor(messageService: MessageBannerService,
        private toastr: ToastrService) { 
        messageService
        .messages
        .subscribe(m => {
            this.toastMessage = m;
            switch (this.toastMessage.messageType) {
                case BannerMessageType.info: {
                    this.toastr.info(this.toastMessage.text, null, {
                        positionClass: 'toast-bottom-right'
                    });
                    break;
                }
                case BannerMessageType.error: {
                    this.toastr.error(this.toastMessage.text, null, {
                        positionClass: 'toast-bottom-right'
                    });
                    break;
                }
                case BannerMessageType.warning: {
                    this.toastr.warning(this.toastMessage.text, null, {
                        positionClass: 'toast-bottom-right'
                    });
                    break;
                }
                case BannerMessageType.success: {
                    this.toastr.success(this.toastMessage.text, null, {
                        positionClass: 'toast-bottom-right'
                    });
                }
            }
        });
    }

    // clearMessage() {
    //     console.warn('clear message event listener called')
    //     this.lastMessage = null;
    // }

    // getMessageBannerClassMap() {
    //     return {
    //         "alert-danger": this.lastMessage.messageType == BannerMessageType.error,
    //         "alert-info": this.lastMessage.messageType == BannerMessageType.info
    //     }
    // }
}