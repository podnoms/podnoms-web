import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppInjector } from 'app/services/app-injector.service';
import { LoggingService } from 'app/services/logging.service';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { BaseComponent } from '../base/base.component';

@Component({
    selector: 'app-base-page',
    template: '',
})
export class BasePageComponent extends BaseComponent implements OnDestroy {
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
