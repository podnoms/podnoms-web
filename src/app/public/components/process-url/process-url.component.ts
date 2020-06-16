import { Component, OnInit } from '@angular/core';
import { UiStateService } from 'app/core/ui-state.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { UrlProcessorService } from 'app/public/services/url-processor.service';
import { SignalRService } from 'app/shared/services/signal-r.service';
import { AudioProcessingMessage } from '../../../core/model/audio';
import { saveAs } from 'file-saver';
import { AlertService } from 'app/core/alerts/alert.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-process-url',
    templateUrl: './process-url.component.html',
    styleUrls: ['./process-url.component.scss'],
})
export class ProcessUrlComponent implements OnInit {
    urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    form: FormGroup;
    status = '';
    processingStatus: AudioProcessingMessage;
    constructor(
        private urlProcessorService: UrlProcessorService,
        private uiStateService: UiStateService,
        private signalRService: SignalRService,
        private alertService: AlertService,
        private fb: FormBuilder,
        private logger: NGXLogger
    ) {
        this.uiStateService.setNakedPage(true);
        this.form = this.fb.group({
            url: [
                environment.production
                    ? ''
                    : 'https://www.youtube.com/watch?v=M2dhD9zR6hk',
                [Validators.required, Validators.pattern(this.urlRegex)],
            ],
        });
    }

    ngOnInit(): void {}

    downloadLink(url: string) {
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = url;
        anchor.target = '_blank';
        document.body.appendChild(anchor);
        anchor.click();
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
    processUrl() {
        this.status = 'Checking';
        this.urlProcessorService
            .validateUrl(this.form.controls.url.value)
            .subscribe((r) => {
                this.logger.debug('process-url.component', 'validated', r);
                if (r.type === 'native') {
                    this.status = 'Submitting';
                    this._startUrlDownload(this.form.controls.url.value);
                }
            });
    }
    _startUrlDownload(url: string) {
        this.urlProcessorService.processUrl(url).subscribe((r) => {
            this.signalRService.init('publicupdates').then((c) => {
                this.logger.debug(
                    'process-url.component',
                    'initialising-hub',
                    r.updateChannelId
                );
                c.on<AudioProcessingMessage>(
                    'publicupdates',
                    r.updateChannelId
                ).subscribe((m) => {
                    this.logger.info(
                        'process-url.component',
                        'GOT A MESSAGE',
                        m
                    );
                    this.processingStatus = m;
                });
            });
        });
    }
}
