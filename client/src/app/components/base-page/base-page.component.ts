import { Component, OnInit, ReflectiveInjector } from '@angular/core';
import { AppInsightsService } from '../../services/app-insights.service';

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
}
