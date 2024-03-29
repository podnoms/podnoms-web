import { Injectable } from '@angular/core';

/* eslint-disable no-bitwise */
@Injectable({
    providedIn: 'root'
})
export class UtilsService {
    constructor() {}

    stringToColour(str: String) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        let colour = '#';
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xff;
            colour += ('00' + value.toString(16)).substr(-2);
        }
        return colour;
    }
}
