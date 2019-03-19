import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DragDropService {
    dragEvents: EventEmitter<any> = new EventEmitter<any>();
    dropEvents: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
        console.log('drag-drop.service', 'ctor');
    }
}
