import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilityService } from '../../services/utility.service';
import { Router } from '@angular/router';
import { timer, Observable } from 'rxjs';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
    errorText: string;

    constructor(private utilityService: UtilityService, private router: Router) {}

    ngOnInit() {
    }

    tryForReload() {
        this.utilityService.checkForApiServer().subscribe(
            () => {
                this.router.navigateByUrl('/podcasts').then(() => window.location.reload());
            },
            () => {
                this.errorText = 'Still down, sorry..';
            }
        );
    }
}
