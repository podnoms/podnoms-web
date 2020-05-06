import { Component, OnInit } from '@angular/core';
import { UiStateService } from 'app/core/ui-state.service';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent {
    constructor(protected uiStateService: UiStateService) {}
}
