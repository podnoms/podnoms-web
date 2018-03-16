import { Injectable } from '@angular/core';
import { AppInsights } from 'applicationinsights-js';
import { environment } from 'environments/environment';

@Injectable()
export class AppInsightsService {

    private config: Microsoft.ApplicationInsights.IConfig = {
        instrumentationKey: environment.appInsights.instrumentationKey
    };
    constructor() {
        if (!AppInsights.config){
            AppInsights.downloadAndSetup(this.config);
        }
    }
}
