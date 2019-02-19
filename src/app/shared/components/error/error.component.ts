import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilityService } from '../../services/utility.service';
import { Router } from '@angular/router';
import { timer, Observable } from 'rxjs';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {
    errorText: string;
    private retrySubscription;

    constructor(private utilityService: UtilityService, private router: Router) {}

    ngOnInit() {
        this._createRetryTimer();
    }
    ngOnDestroy() {
        if (this.retrySubscription) {
            this.retrySubscription.unsubscribe();
        }
    }
    tryForReload() {
        this.utilityService.checkForApiServer().subscribe(
            r => {
                this.router.navigateByUrl('/podcasts').then(() => window.location.reload());
            },
            err => {
                this.errorText = 'Still down, sorry..';
            }
        );
    }
    _createRetryTimer() {
        if (!this.retrySubscription) {
            this.retrySubscription = timer(0, 1000).subscribe(r => {
                this.tryForReload();
            });
        }
    }
}
