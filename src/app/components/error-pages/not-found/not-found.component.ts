import { Component } from '@angular/core';
import { BasePageComponent } from 'app/shared/components/base-page/base-page.component';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent extends BasePageComponent {
    constructor() {
        super();
    }
}
