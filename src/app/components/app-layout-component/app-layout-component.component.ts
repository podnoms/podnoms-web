import { Component, OnInit } from '@angular/core';
import { UiStateService } from 'app/core/ui-state.service';

@Component({
    selector: 'app-app-layout-component',
    templateUrl: './app-layout-component.component.html',
    styleUrls: ['./app-layout-component.component.scss'],
})
export class AppLayoutComponentComponent implements OnInit {
    constructor(public uiStateService: UiStateService) {}

    ngOnInit(): void {}
}
