export class ApiKeyRequestModel {
    constructor(name: string) {
        this.name = name;
    }
    id: string;
    name: string;
    prefix: string;
    scopes: string;
    plainTextKey: string;
    dateIssued: Date;
}
