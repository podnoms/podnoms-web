import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-spinner-button',
    templateUrl: './spinner-button.component.html',
    styleUrls: ['./spinner-button.component.scss'],
})
export class SpinnerButtonComponent {
    @Input() buttonId: string = 'wait-spinner-id';
    @Input() buttonClass: string = '';
    @Input() iconClass: string = '';
    @Input() disabled: boolean = false;
    @Output() clicked: EventEmitter<any> = new EventEmitter();
    processing: boolean = false;
    constructor() {}

    click() {
        this.processing = true;
        this.disabled = true;
        this.clicked.emit(() => {
            this.processing = false;
            this.disabled = false;
        });
    }
}
