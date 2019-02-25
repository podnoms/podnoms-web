import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SharingService } from '../../shared/services/sharing.service';
import { ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-sharing',
    templateUrl: './sharing.component.html',
    styleUrls: ['./sharing.component.scss']
})
export class SharingComponent implements OnInit, OnDestroy {
    sharedItem$: Observable<any>;
    sub: any;
    sharingLink: string;
    constructor(private sharingService: SharingService, private route: ActivatedRoute, private meta: Meta) {}

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.sharingLink = params['id'];
            this.sharedItem$ = this.sharingService.getSharingItem(this.sharingLink);

            this.sharedItem$.subscribe(i => {
                this.meta.addTags([{ name: 'og:image', content: i.imageUrl }]);
            });
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    downloadShareLink(link: string) {
        console.log('sharing.component', 'downloadShareLink', link);
    }
}
