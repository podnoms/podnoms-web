import { Component, OnInit } from '@angular/core';
import { UiStateService } from 'app/core/ui-state.service';
import { NGXLogger } from 'ngx-logger';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent {
    constructor(
        protected logger: NGXLogger,
        protected uiStateService: UiStateService
    ) {}

    protected swallowClick() {}
}
