import {
    Component,
    OnInit,
    Input,
    ChangeDetectorRef,
    AfterViewInit,
    ChangeDetectionStrategy,
} from '@angular/core';
import { Podcast, Category } from '../../core';
import { PodcastDataService } from '../podcast-data.service';
import { AlertService } from '../../core/alerts/alert.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { validateDomain } from 'app/shared/validators/domain.validator';
import { UtilityService } from 'app/shared/services/utility.service';
import { requiredIfValidator } from 'app/shared/validators/required.validator';
import { urlIsValidValidator } from 'app/shared/validators/valid-url.validator';

@Component({
    selector: 'app-podcast-public-settings',
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl: './podcast-public-settings.component.html',
    styleUrls: ['./podcast-public-settings.component.scss'],
})
export class PodcastPublicSettingsComponent implements AfterViewInit {
    @Input()
    podcast: Podcast;
    sslRequestUri: string = '';
    publicSettingsForm: FormGroup;

    constructor(
        private podcastDataService: PodcastDataService,
        private alertService: AlertService,
        private utilityService: UtilityService,
        private cd: ChangeDetectorRef,
        private fb: FormBuilder
    ) {}

    ngAfterViewInit() {
        this.sslRequestUri = `mailto:customdomain@podnoms.com?subject=Custom domain request&body=URL:${this.podcast.pagesUrl}%0D%0APlease leave the above line intact`;
        setTimeout(() => {
            this.publicSettingsForm = this._createForm(this.fb, this.podcast);
        });
    }
    _createForm(fb: FormBuilder, podcast: Podcast): FormGroup {
        return this.fb.group({
            publicTitle: [podcast.publicTitle, Validators.required],
            twitterUrl: [podcast.twitterUrl, urlIsValidValidator],
            facebookUrl: [podcast.facebookUrl, urlIsValidValidator],
            customDomain: [
                podcast.customDomain,
                Validators.compose([]),
                Validators.composeAsync([
                    validateDomain(this.utilityService, 'pages.podnoms.com'),
                ]),
            ],
            customRssDomain: [
                podcast.customRssDomain,
                Validators.compose([]),
                Validators.composeAsync([
                    validateDomain(this.utilityService, 'rss.podnoms.com'),
                ]),
            ],
            private: [podcast.private, Validators.required],
            authUserName: [
                podcast.authUserName,
                requiredIfValidator(
                    () => this.publicSettingsForm.get('private').value
                ),
            ],
            authPassword: [
                podcast.authPassword,
                requiredIfValidator(
                    () => this.publicSettingsForm.get('private').value
                ),
            ],
        });
        this.cd.detectChanges();
    }
    runValidation() {
        this.publicSettingsForm.controls[
            'authUserName'
        ].updateValueAndValidity();
        this.publicSettingsForm.controls[
            'authPassword'
        ].updateValueAndValidity();
    }
    submitForm() {
        this.podcast = Object.assign(
            this.podcast,
            this.publicSettingsForm.value
        );
        this.podcast.category = this.podcast.category || null;
        this.podcastDataService
            .updatePodcast(this.podcast)
            .subscribe((r) =>
                this.alertService.info('Success', 'Updated podcast settings')
            );
        return false;
    }
}
