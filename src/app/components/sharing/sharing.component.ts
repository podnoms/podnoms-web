import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Shareable } from '../../core';
import { AlertService } from '../../core/alert.service';
import { SharingService } from '../../shared/services/sharing.service';

@Component({
    selector: 'app-sharing',
    templateUrl: './sharing.component.html',
    styleUrls: ['./sharing.component.scss']
})
export class SharingComponent implements OnInit {
    @ViewChild('emailAddress') emailControl;
    @Input() entry: Shareable;

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
    copyUrl(url: string) {
        const el = document.createElement('textarea');
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        this.alertService.success('Success', 'URL Copied to clipboard');
    }
}
