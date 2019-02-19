import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SharingService } from '../../shared/services/sharing.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-sharing',
    templateUrl: './sharing.component.html',
    styleUrls: ['./sharing.component.scss']
})
export class SharingComponent implements OnInit, OnDestroy {
    sharedItem$: Observable<any>;
    sub: any;
    sharingLink: string;
    constructor(private sharingService: SharingService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.sharingLink = params['id'];
            this.sharedItem$ = this.sharingService.getSharingItem(this.sharingLink);
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    downloadShareLink(link: string) {
        console.log('sharing.component', 'downloadShareLink', link);
    }
}
