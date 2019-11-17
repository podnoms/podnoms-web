import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConstantsService {
    // tslint:disable-next-line: max-line-length
    public emailRegex: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor() {}

}
