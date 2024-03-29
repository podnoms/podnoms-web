import { Component } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators
} from '@angular/forms';
import { NGXLogger } from 'ngx-logger';
import { ApiKeyService } from '../../../services/api-key.service';
import { BasePageComponent } from '../../../shared/components/base-page/base-page.component';

@Component({
    selector: 'app-youtube-api-key',
    templateUrl: './youtube-api-key.component.html',
    styleUrls: ['./youtube-api-key.component.scss'],
})
export class YoutubeApiKeyComponent extends BasePageComponent {
    public keyForm: UntypedFormGroup;
    reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    keyText: string;
    urlText: string;

    constructor(
        private apiKeyService: ApiKeyService,
        private formBuilder: UntypedFormBuilder,
        logger: NGXLogger
    ) {
        super();

        this.keyForm = this.formBuilder.group({
            key: new UntypedFormControl(this.keyText, [
                Validators.required,
                Validators.minLength(39),
                Validators.maxLength(39),
            ]),
            url: new UntypedFormControl(this.keyText, [Validators.pattern(this.reg)]),
        });
    }

    get key() {
        return this.keyForm.get('key');
    }

    get url() {
        return this.keyForm.get('url');
    }

    submitForm(keyData): void {
        this.apiKeyService
            .addNewApiKey('YouTube', keyData.key, keyData.url)
            .subscribe((r) => this.logger.debug(r));
    }
}
