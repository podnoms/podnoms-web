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
    @Output() shareComplete: EventEmitter<string> = new EventEmitter<string>();
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
    getSharingLink(__ts__event__) {
        this.sharingService.getSharingLink(this.entry.id).subscribe(l => {
            this.linkUrl = l;
            __ts__event__();
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
                    this.shareComplete.emit(r);
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
                    .subscribe(() => this.shareComplete.emit());
                break;
            case 'twitter':
                this.sharingService
                    .shareToTwitter(this.entry.id)
                    .subscribe(() => this.shareComplete.emit());
                break;
        }
    }
    closeModal() {
        this.shareComplete.emit();
    }
}
