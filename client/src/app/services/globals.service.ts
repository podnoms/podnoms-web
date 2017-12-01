import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsService {
    private _data: { [id: string]: String } = {};
    constructor() {
        this._data['app_class'] = 'sidebar-o side-scroll side-trans-enabled';
    }
}
