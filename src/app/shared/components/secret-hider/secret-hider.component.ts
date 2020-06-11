import {
    Component,
    Input,
    ViewChild,
    ElementRef,
    AfterViewInit,
    OnInit,
    Output,
    EventEmitter,
    SimpleChanges,
    OnChanges,
    AfterViewChecked,
} from '@angular/core';
import { timer } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { ProfileDataService } from '../../../profile/profile-data.service';
import { ApiKeyRequestModel } from 'app/core';
import { AlertService } from 'app/core/alerts/alert.service';
declare var $: any;
@Component({
    selector: 'app-secret-hider',
    templateUrl: './secret-hider.component.html',
    styleUrls: ['./secret-hider.component.scss'],
})
export class SecretHiderComponent implements AfterViewInit, OnChanges {
    @Input() secret: ApiKeyRequestModel;

    @ViewChild('maskInput') maskInput: ElementRef;

    overlayProperties = {
        width: 0,
        height: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: 0,
    };
    constructor(
        private profileDataService: ProfileDataService,
        private alertService: AlertService,
        private logger: NGXLogger
    ) {
        this.logger.debug(
            'secret-hider.component',
            'ctor',
            this.overlayProperties
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.maskInput) {
            this.logger.debug('secret-hider.component', 'CHANGES', changes);
            this.__updateOverlay();
        }
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.__updateOverlay();
            if (this.secret.plainTextKey) {
                this._createOpenTimer();
            }
        });
    }
    __updateOverlay() {
        if (this.maskInput && this.maskInput.nativeElement) {
            this.overlayProperties = {
                width: $(this.maskInput.nativeElement).outerWidth(),
                height: $(this.maskInput.nativeElement).outerHeight(),
                position: 'absolute',
                top: this.maskInput.nativeElement.offsetTop,
                left: this.maskInput.nativeElement.offsetLeft,
                borderRadius: $(this.maskInput.nativeElement).css(
                    'borderRadius'
                ),
            };
            this.logger.debug(
                'secret-hider.component',
                '__updateOverlay',
                this.overlayProperties
            );
        }
    }
    private _createOpenTimer() {
        const source = timer(0, 6);
        const sub = source.subscribe((r) => {
            this.overlayProperties.width -= 8;
            if (this.overlayProperties.width <= 0) {
                sub.unsubscribe();
                setTimeout(() => {
                    this._createCloseTimer();
                }, 20000);
            }
        });
    }
    private _createCloseTimer() {
        const source = timer(0, 6);
        const sub = source.subscribe((r) => {
            this.overlayProperties.width += 8;
            if (
                this.overlayProperties.width >=
                $(this.maskInput.nativeElement).outerWidth()
            ) {
                sub.unsubscribe();
                this.overlayProperties.width = $(
                    this.maskInput.nativeElement
                ).outerWidth();
                this.secret.plainTextKey = '';
            }
        });
    }
    recreateSecret() {
        this.profileDataService.regenerateKey(this.secret).subscribe((r) => {
            // this.logger.debug('api-keys.component', 'requestNewKey', r);
            this.secret = r;
            if (this.secret) {
                this.logger.debug(
                    'api-keys.component',
                    'NOT SO MUCH OF A GENIUS',
                    this.secret
                );
                this._createOpenTimer();
            }
        });
    }
    copySecret() {
        const el = document.createElement('textarea');
        el.value = this.secret.plainTextKey;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        this.alertService.success('Success', 'URL Copied to clipboard');
    }
}
