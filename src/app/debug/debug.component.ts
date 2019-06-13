import { Component, OnInit } from '@angular/core';
import { PodcastDataService } from '../podcasts/podcast-data.service';
import { AlertService } from 'app/core/alerts/alert.service';

@Component({
    selector: 'app-debug',
    templateUrl: './debug.component.html',
    styleUrls: ['./debug.component.scss']
})
export class DebugComponent implements OnInit {
    constructor(private alertService: AlertService) {}

    ngOnInit() {}

    clickProcess($event: () => void) {
        setTimeout(() => $event(), 2000);
    }
    showToast() {
        this.alertService.success(
            'Hello Sailor',
            'Lorem ipsum motherfucker',
            '',
            {
                autoClose: false
            }
        );
    }
}
