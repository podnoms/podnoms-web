import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UiStateService } from 'app/core/ui-state.service';
import { BaseComponent } from '../base/base.component';
import { NGXLogger } from 'ngx-logger';
import { LoggingService } from 'app/services/logging.service';
import { AppInjector } from 'app/services/app-injector.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-base-page',
    template: '',
})
export class BasePageComponent extends BaseComponent {
    private __loggingService: LoggingService;
    private __router: Router;
    private __activatedRoute: ActivatedRoute;
    private destroy = new Subject<void>();
    constructor() {
        super();
        const injector = AppInjector.getInstance().getInjector();
        this.__loggingService = injector.get(LoggingService);
        this.__router = injector.get(Router);
        this.__activatedRoute = injector.get(ActivatedRoute);

        this.logNavigation();

        this.logNavigation();

        this.__activatedRoute.paramMap.pipe(
            map((paramMap) => paramMap.get('routePathParam')),
            takeUntil(this.destroy)
        );
    }
    ngOnDestroy() {
        this.destroy.next();
        this.destroy.complete();
    }

    private logNavigation() {
        this.logger.debug(
            'base-page.component',
            this.constructor.name,
            this.__router.url
        );
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
