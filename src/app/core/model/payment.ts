export class Payment {
    id: string;
    transactionId: string;

    createDate: Date;
    startDate: Date;
    endDate: Date;
    type: string;
    amount: number;
    receiptURL: string;
}
