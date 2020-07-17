import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

@Injectable({
    providedIn: 'root',
})
export class LoggingService {
    appInsights: ApplicationInsights;
    constructor() {
        this.appInsights = new ApplicationInsights({
            config: {
                instrumentationKey: environment.appInsights.instrumentationKey,
                enableAutoRouteTracking: true, // option to log all route changes
            },
        });
        if (environment.production) {
            this.appInsights.loadAppInsights();
        }
    }

    logPageView(name?: string, url?: string) {
        // option to call manually
        if (environment.production) {
            this.appInsights.trackPageView({
                name: name,
                uri: url,
            });
        }
    }

    logEvent(name: string, properties?: { [key: string]: any }) {
        if (environment.production) {
            this.appInsights.trackEvent({ name: name }, properties);
        }
    }

    logMetric(
        name: string,
        average: number,
        properties?: { [key: string]: any }
    ) {
        if (environment.production) {
            this.appInsights.trackMetric(
                { name: name, average: average },
                properties
            );
        }
    }

    logException(exception: Error, severityLevel?: number) {
        if (environment.production) {
            this.appInsights.trackException({
                exception: exception,
                severityLevel: severityLevel,
            });
        }
    }

    logTrace(message: string, properties?: { [key: string]: any }) {
        if (environment.production) {
            this.appInsights.trackTrace({ message: message }, properties);
        }
    }
}
