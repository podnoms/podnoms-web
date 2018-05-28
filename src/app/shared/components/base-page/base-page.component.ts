import { Component, OnInit, ReflectiveInjector } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-base-page',
    template: ''
})
export class BasePageComponent {
    constructor() {}

    protected formatError(error: string): string {
        return `${error}<br />Please visit <a href="${
            environment.helpUrl
        }" target="_blank">here</a> and request help.`;
    }
}
