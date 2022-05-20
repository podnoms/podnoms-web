import {
  Component,
  Input,
  ChangeDetectorRef,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Podcast } from '../../core';
import { PodcastDataService } from '../podcast-data.service';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { validateDomain } from 'app/shared/validators/domain.validator';
import { UtilityService } from 'app/shared/services/utility.service';
import { urlIsValidValidator } from 'app/shared/validators/valid-url.validator';
import { Observable, Subject } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { ConstantsService } from 'app/shared/services/constants.service';
import { RequiredIfValidator } from 'app/shared/validators/required-if.validator';

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
    private utilityService: UtilityService,
    private constants: ConstantsService,
    private fb: FormBuilder,
    private logger: NGXLogger
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
        Validators.compose([Validators.pattern(this.constants.domainRegex)]),
        Validators.composeAsync([
          validateDomain(this.utilityService, 'pages.podnoms.com'),
        ]),
      ],
      customRssDomain: [
        podcast.customRssDomain,
        Validators.compose([Validators.pattern(this.constants.domainRegex)]),
        Validators.composeAsync([
          validateDomain(this.utilityService, 'rss.podnoms.com'),
        ]),
      ],
      private: [podcast.private, Validators.required],
      authUserName: [
        podcast.authUserName,
        // Validators.compose([
        //   RequiredIfValidator.createValidator(
        //     this.publicSettingsForm.get('private')?.value
        //   ),
        // ]),
      ],
      authPassword: [
        podcast.authPassword,
        // Validators.compose([
        //   RequiredIfValidator.createValidator(
        //     this.publicSettingsForm.get('private')?.value
        //   ),
        // ]),
      ],
    });
  }
  runValidation() {
    this.publicSettingsForm.controls['authUserName'].updateValueAndValidity();
    this.publicSettingsForm.controls['authPassword'].updateValueAndValidity();
  }
  parentSaveHandler(): Observable<Podcast> {
    return this.submitForm();
  }
  getFormErrors() {
    Object.keys(this.publicSettingsForm.controls).forEach((key) => {
      const controlErrors: ValidationErrors = this.publicSettingsForm.get(key)
        .errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          console.log(
            'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
            controlErrors[keyError]
          );
        });
      }
    });
  }
  formStatus(): any {
    return {
      isValid: this.publicSettingsForm.valid,
      hasChanges: this.publicSettingsForm.dirty,
      form: this.publicSettingsForm,
    };
  }
  submitForm(): Observable<Podcast> {
    const subject = new Subject<Podcast>();
    this.podcast = Object.assign(this.podcast, this.publicSettingsForm.value);
    this.podcast.category = this.podcast.category;
    this.podcastDataService.updatePodcast(this.podcast).subscribe(
      (podcast) => {
        this.publicSettingsForm.markAsPristine();
        subject.next(podcast);
        subject.complete();
      },
      (err) => {
        this.logger.error(
          'podcast-public-settings.component',
          'submitForm',
          err
        );
        return false;
      }
    );
    return subject;
  }
}
