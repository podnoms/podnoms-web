import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilityService } from '../../../shared/services/utility.service';
import { Router } from '@angular/router';
import { timer, Observable } from 'rxjs';
import { UiStateService } from 'app/core/ui-state.service';
import { BasePageComponent } from 'app/shared/components/base-page/base-page.component';
import { NGXLogger } from 'ngx-logger';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent extends BasePageComponent {
    errorText: string;
    constructor(
        private utilityService: UtilityService,
        private router: Router,
        logger: NGXLogger,
        uiStateService: UiStateService
    ) {
        super(logger, uiStateService);
    }

    ngOnInit() {}

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
