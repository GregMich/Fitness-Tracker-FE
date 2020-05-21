import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Subject } from "rxjs";
import { BannerMessage } from "./messageBanner.model";

@Injectable()
export class MessageBannerService
{
    private subject = new Subject<BannerMessage>();

    reportMessage(msg: BannerMessage) {
        console.log('message reported');
        this.subject.next(msg);
    }

    get messages(): Observable<BannerMessage> {
        return this.subject;
    }
}