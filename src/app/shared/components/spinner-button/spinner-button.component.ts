import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-spinner-button',
    templateUrl: './spinner-button.component.html',
    styleUrls: ['./spinner-button.component.scss']
})
export class SpinnerButtonComponent implements OnInit {
    @Input() buttonClass: string = '';
    @Input() iconClass: string = '';
    @Input() disabled: boolean = false;
    @Output() clicked: EventEmitter<any> = new EventEmitter();
    processing: boolean = false;
    constructor() {}

    ngOnInit() {}

    click() {
        this.processing = true;
        this.clicked.emit(() => {
            this.processing = false;
        });
    }
}
