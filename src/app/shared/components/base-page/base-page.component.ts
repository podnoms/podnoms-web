import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UiStateService } from 'app/core/ui-state.service';
import { BaseComponent } from '../base/base.component';
import { NGXLogger } from 'ngx-logger';
import { LoggingService } from 'app/services/logging.service';
import { AppInjector } from 'app/services/app-injector.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-base-page',
    template: '',
})
export class BasePageComponent extends BaseComponent {
    private __loggingService: LoggingService;
    private __router: Router;

    constructor() {
        super();
        const injector = AppInjector.getInstance().getInjector();
        this.__loggingService = injector.get(LoggingService);
        this.__router = injector.get(Router);

        this.logNavigation();

        this.uiStateService.setNakedPage(false);
        this.logNavigation();
    }

    private logNavigation() {
        this.logger.debug('base-page.component', '');
        try {
            this.__loggingService.logPageView(
                this.constructor.name,
                this.__router.url
            );
        } catch (e) {
            this.logger.error('base-page.component', 'logNavigation', e);
        }
    }
    protected formatError(error: string): string {
        return `${error}<br />Please visit <a href="${environment.helpUrl}" target="_blank">here</a> and request help.`;
    }
}
