import { Component, OnInit } from '@angular/core';
import { UiStateService } from 'app/core/ui-state.service';
import { NGXLogger } from 'ngx-logger';
import { LoggingService } from 'app/services/logging.service';
import { AppInjector } from 'app/services/app-injector.service';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss'],
})
export class BaseComponent {
    protected logger: NGXLogger;
    protected uiStateService: UiStateService;

    constructor() {
        const injector = AppInjector.getInstance().getInjector();
        if (injector) {
            this.logger = injector.get(NGXLogger);
            this.uiStateService = injector.get(UiStateService);
        }
    }

    protected swallowClick() {}
}
