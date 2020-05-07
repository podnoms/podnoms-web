import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from 'app/shared/components/base-page/base-page.component';
import { UiStateService } from 'app/core/ui-state.service';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent extends BasePageComponent {
    constructor(protected uiStateService: UiStateService) {
        super(uiStateService);
    }

    ngOnInit(): void {
        this.uiStateService.setNakedPage(true);
    }
}
