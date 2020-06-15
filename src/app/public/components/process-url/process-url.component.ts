import { Component, OnInit } from '@angular/core';
import { UiStateService } from 'app/core/ui-state.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';

@Component({
    selector: 'app-process-url',
    templateUrl: './process-url.component.html',
    styleUrls: ['./process-url.component.scss'],
})
export class ProcessUrlComponent implements OnInit {
    urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    form: FormGroup;
    status = 'none';
    constructor(
        private uiStateService: UiStateService,
        private fb: FormBuilder,
        private logger: NGXLogger
    ) {
        this.uiStateService.setNakedPage(true);
        this.form = this.fb.group({
            url: [
                'https://www.mixcloud.com/souljazzfunksters/soul-jazz-funksters-rats-in-the-ghetto-mix/',
                [Validators.required, Validators.pattern(this.urlRegex)],
            ],
        });
    }

    ngOnInit(): void {}

    processUrl() {
        this.logger.debug(
            'process-url.component',
            'processUrl',
            this.form.controls.url.value
        );
        this.status = 'checking';
    }
}
