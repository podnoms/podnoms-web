import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UiStateService } from 'app/core/ui-state.service';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'app-base-page',
    template: ''
})
export class BasePageComponent extends BaseComponent {
    constructor(protected uiStateService: UiStateService) {
        super(uiStateService);
        uiStateService.setNakedPage(false);
    }

    protected formatError(error: string): string {
        return `${error}<br />Please visit <a href="${environment.helpUrl}" target="_blank">here</a> and request help.`;
    }
}
