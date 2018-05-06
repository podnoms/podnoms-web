import { Component, OnInit, ReflectiveInjector } from '@angular/core';
import { AppInsightsService } from '../../services/app-insights.service';
import { environment } from 'environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
    selector: 'app-base-page',
    template: ''
})
export class BasePageComponent {
    private _appInsightsService: AppInsightsService;
    constructor() {
        const injector = ReflectiveInjector.resolveAndCreate([
            AppInsightsService
        ]);
        this._appInsightsService = injector.get(AppInsightsService);
        this.logNavigation();
    }

    private logNavigation() {
        this._appInsightsService.logPageView();
    }

    protected formatError(error: string): string {
        return `${error}<br />Please visit <a href="${
            environment.HELP_URL
        }" target="_blank">here</a> and request help.`;
    }
}
