import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UiStateService } from 'app/core/ui-state.service';
import { BasePageComponent } from 'app/shared/components/base-page/base-page.component';
import { NGXLogger } from 'ngx-logger';
import { UtilityService } from '../../../shared/services/utility.service';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss'],
})
export class ErrorComponent extends BasePageComponent {
    errorText: string;
    constructor(
        private utilityService: UtilityService,
        private router: Router,
        logger: NGXLogger,
        uiStateService: UiStateService
    ) {
        super();
    }

    tryForReload() {
        this.utilityService.checkForApiServer().subscribe(
            () => {
                this.router
                    .navigateByUrl('/podcasts')
                    .then(() => window.location.reload());
            },
            () => {
                this.errorText = 'Still down, sorry..';
            }
        );
    }
}
