export class BannerMessage
{
 
    constructor(public text: string,
        public messageType: BannerMessageType) { }
}

export enum BannerMessageType
{
    info,
    error,
    warning
}