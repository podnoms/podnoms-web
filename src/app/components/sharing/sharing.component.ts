import { ConstantsService } from './../../shared/services/constants.service';
import {
    Component,
    Input,
    ViewChild,
    Output,
    EventEmitter,
    AfterViewInit
} from '@angular/core';
import { Shareable } from '../../core';
import { AlertService } from '../../core/alerts/alert.service';
import { SharingService } from '../../shared/services/sharing.service';

@Component({
    selector: 'app-sharing',
    templateUrl: './sharing.component.html',
    styleUrls: ['./sharing.component.scss']
})
export class SharingComponent implements AfterViewInit {
    @ViewChild('emailAddress', { static: false }) emailControl;
    @Input() entry: Shareable;
    @Output() shareComplete: EventEmitter<boolean> = new EventEmitter<
        boolean
    >();
    // tslint:disable-next-line: max-line-length
    error: string = '';
    email: string = '';
    message: string = '';
    linkUrl: string = '';
    constructor(
        private sharingService: SharingService,
        private alertService: AlertService,
        private constants: ConstantsService
    ) {}

    ngAfterViewInit() {
        this.emailControl.nativeElement.focus();
    }
    getSharingLink($event) {
        this.sharingService.getSharingLink(this.entry.id).subscribe(l => {
            this.linkUrl = l;
            $event();
        });
    }
    shareToEmail() {
        if (!this.constants.emailRegex.test(this.email)) {
            this.error = 'This does not look like an email address?';
        } else {
            this.sharingService
                .shareToEmail(this.entry.id, this.email, this.message)
                .subscribe(r => {
                    this.alertService.success(
                        'Link shared successfully',
                        `${this.email}'s got mail!!!`
                    );
                    this.shareComplete.emit(true);
                });
        }
    }
    copyUrl(url: string) {
        const el = document.createElement('textarea');
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        this.alertService.success('Success', 'URL Copied to clipboard');
    }
    share(service: string) {
        switch (service) {
            case 'facebook':
                this.sharingService
                    .shareToFacebook(this.entry.id)
                    .subscribe(() => this.shareComplete.emit(true));
                break;
            case 'twitter':
                this.sharingService
                    .shareToTwitter(this.entry.id)
                    .subscribe(() => this.shareComplete.emit(true));
                break;
        }
    }
    closeModal() {
        this.shareComplete.emit(false);
    }
}
