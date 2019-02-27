import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Shareable } from '../../core';
import { AlertService } from '../../core/alert.service';
import { SharingService } from '../../shared/services/sharing.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-sharing',
    templateUrl: './sharing.component.html',
    styleUrls: ['./sharing.component.scss']
})
export class SharingComponent implements OnInit {
    @ViewChild('emailAddress') emailControl;
    @Input() entry: Shareable;
    @Output() shareComplete: EventEmitter<string> = new EventEmitter<string>();

    error: string = '';
    email: string = '';
    message: string = '';
    linkUrl: string = '';
    constructor(private sharingService: SharingService, private alertService: AlertService) {}

    ngOnInit() {
        this.emailControl.nativeElement.focus();
    }
    getSharingLink() {
        this.sharingService.getSharingLink(this.entry.id).subscribe(l => (this.linkUrl = l));
    }
    shareToEmail() {
        if (!environment.emailRegex.test(this.email)) {
            this.error = 'This does not look like an email address?';
        } else {
            this.sharingService.shareToEmail(this.entry.id, this.email, this.message).subscribe(r => {
                this.alertService.success('Link shared successfully', `${this.email}'s got mail!!!`);
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
                this.sharingService.shareToFacebook(this.entry.id).subscribe(r => this.shareComplete.emit());
                break;
            case 'twitter':
                this.sharingService.shareToTwitter(this.entry.id).subscribe(r => this.shareComplete.emit());
                break;
        }
    }
    closeModal() {
        this.shareComplete.emit();
    }
}
