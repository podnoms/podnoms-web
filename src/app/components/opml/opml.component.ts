import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileDataService } from 'app/profile/profile-data.service';
import { map } from 'rxjs/operators';
import { AlertService } from '../../core/alerts/alert.service';
import { UtilityService } from 'app/shared/services/utility.service';

@Component({
    selector: 'app-opml',
    templateUrl: './opml.component.html',
    styleUrls: ['./opml.component.scss'],
})
export class OpmlComponent implements OnInit {
    publicOpmlUrl$: Observable<string>;
    opml$: Observable<string>;
    raw: string;
    constructor(
        private alertService: AlertService,
        private profileDataService: ProfileDataService
    ) {}

    ngOnInit(): void {
        this.opml$ = this.profileDataService
            .getOpml()
            .pipe(map((r) => (this.raw = r)));

        this.publicOpmlUrl$ = this.profileDataService.getPublicOpmlUrl();
    }
    saveOpml() {
        const file_name = 'podnoms-opml.xml';

        const a = document.createElement('a');
        const file = new Blob([this.raw], { type: 'text/xml' });
        a.href = URL.createObjectURL(file);
        a.download = file_name;

        a.dispatchEvent(new MouseEvent('click'));
        document.body.removeChild(a);
    }
    copyOpml() {
        const el = document.createElement('textarea');
        el.value = this.raw;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        this.alertService.success('Success', 'OPML copied to clipboard');
    }
    openUrl(url: string) {
        window.open(url, '_blank');
    }
    copyUrl(url: string) {
        const el = document.createElement('textarea');
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        this.alertService.success('Success', 'URL copied to clipboard');
    }
}
