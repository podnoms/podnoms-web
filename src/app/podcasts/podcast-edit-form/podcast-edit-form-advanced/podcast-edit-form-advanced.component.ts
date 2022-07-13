import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Podcast } from 'app/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { validateSearch } from 'app/shared/validators/search.validator';
import { validateDomain } from 'app/shared/validators/domain.validator';
import { UtilityService } from 'app/shared/services/utility.service';
import { PodcastDataService } from 'app/podcasts/podcast-data.service';
import { Router } from '@angular/router';
import { PodcastStoreService } from 'app/podcasts/podcast-store.service';
import { Observable, Observer } from 'rxjs';
import { ConstantsService } from '../../../shared/services/constants.service';

@Component({
  selector: 'app-podcast-edit-form-advanced',
  templateUrl: './podcast-edit-form-advanced.component.html',
  styleUrls: ['./podcast-edit-form-advanced.component.scss'],
})
export class PodcastEditFormAdvancedComponent implements AfterViewInit {
  @Input()
  podcast: Podcast;
  podcastForm: UntypedFormGroup;
  sslRequestUri: string = '';
  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private utilityService: UtilityService,
    private constants: ConstantsService,
    private podcastStore: PodcastStoreService,
    private podcastDataService: PodcastDataService
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.podcastForm = this._createForm(this.fb, this.podcast);
      this.sslRequestUri = `mailto:customdomain@podnoms.com?subject=Custom domain request&body=URL:${this.podcast.pagesUrl}%0D%0APlease leave the above line intact`;
    });
  }
  parentSaveHandler(): Observable<boolean> {
    return this.submitForm();
  }
  submitForm(): Observable<boolean> {
    return new Observable((observer: Observer<boolean>) => {
      const podcast: Podcast = Object.assign(
        this.podcast,
        this.podcastForm.value
      );
      this.podcastDataService.updatePodcast(podcast).subscribe(
        () => {
          this.podcastStore.updateOneInCache(podcast);
          return true;
        },
        (err) => {
          console.log(
            'podcast-edit-form-advanced.component',
            'submitForm',
            err
          );
          return false;
        }
      );
    });
  }
  _createForm(fb: UntypedFormBuilder, podcast: Podcast): UntypedFormGroup {
    const form = fb.group({
      id: [podcast.id],
      category: [podcast.category, Validators.required],
      slug: [
        podcast.slug,
        Validators.compose([Validators.maxLength(30)]),
        Validators.composeAsync([
          validateSearch(this.utilityService, 'Podcasts', 'Slug', podcast.slug),
        ]),
      ],
    });
    return form;
  }
}
