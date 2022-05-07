import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { Shareable } from '../../core';
import { AlertService } from '../../core/alerts/alert.service';
import { SharingService } from '../../shared/services/sharing.service';
import { ConstantsService } from './../../shared/services/constants.service';

@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.scss'],
})
export class SharingComponent implements AfterViewInit {
  @ViewChild('emailAddress') emailControl;
  @Input() entry: Shareable;
  @Output() shareComplete: EventEmitter<boolean> = new EventEmitter<boolean>();
  // eslint-disable-next-line max-len
  error: string = '';
  email: string = '';
  message: string = '';
  linkUrl: string = '';

  auth2: any;

  @ViewChild('googleLoginButton')
  googleContactsButton: ElementRef;

  public environment = environment;

  constructor(
    private sharingService: SharingService,
    private alertService: AlertService,
    private constants: ConstantsService,
    public activeModal: NgbActiveModal
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.emailControl.nativeElement.focus();
    }, 0);
  }

  getSharingLink($event) {
    this.sharingService.getSharingLink(this.entry.id).subscribe((l) => {
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
        .subscribe(() => {
          this.alertService.success(
            'Link shared successfully',
            `${this.email}'s got mail!!!`
          );
          this.activeModal.close();
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

  openUrl(url: string) {
    window.open(url, '_blank');
  }

  linkSettings(url: string) {}

  share(service: string) {
    this.activeModal.close();
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
    this.activeModal.close();
  }
}
