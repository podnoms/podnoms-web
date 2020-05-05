export class Chat {
    constructor(
        toId: string,
        fromId: string,
        fromName: string,
        message: string
    ) {
        this.toUserId = toId;
        this.fromUserId = fromId;
        this.fromUserName = fromName;
        this.message = message;
    }
    messageId: string;
    message: string;
    fromUserImage: string;
    fromUserId: string;
    fromUserName: string;
    toUserId: string;
    toUserName: string;
    messageDate?: Date;
}
