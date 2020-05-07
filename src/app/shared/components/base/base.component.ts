import { Component, OnInit } from '@angular/core';
import { UiStateService } from 'app/core/ui-state.service';
import { NgxFancyLoggerService } from 'ngx-fancy-logger';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent {
    constructor(
        protected logger: NgxFancyLoggerService,
        protected uiStateService: UiStateService
    ) {}

    protected swallowClick() {}
}
