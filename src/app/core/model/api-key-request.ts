export class ApiKeyRequestModel {
    constructor(name: string) {
        this.name = name;
    }
    name: string;
    prefix: string;
    scopes: string;
    plainTextKey: string;
}
