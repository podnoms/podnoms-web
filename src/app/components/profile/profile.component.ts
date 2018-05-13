import { ProfileService } from 'app/services/profile.service';
import { Store } from '@ngrx/store';
import { ApplicationState } from './../../store/index';
import { Observable } from 'rxjs/Observable';
import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    AfterViewInit,
    NgZone,
    ViewChildren,
    ViewContainerRef
} from '@angular/core';
import { ProfileModel } from 'app/models/profile.model';
import * as fromProfile from 'app/reducers';
import * as fromProfileActions from 'app/actions/profile.actions';
import { Router } from '@angular/router';
import { ImageService } from 'app/services/image.service';
import { BasePageComponent } from '../base-page/base-page.component';
import { ProfileLimitsModel } from 'app/models/profile.limits';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

declare let jQuery: any;

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends BasePageComponent
    implements AfterViewInit {
    profile$: Observable<ProfileModel>;

    originalSlug: string;
    slugError: string = '';

    private imageChanged = false;
    image: any = new Image();
    sending = false;
    _imageFileBuffer: File;

    @ViewChild('fileInput') fileInput: ElementRef;
    limits$: Observable<ProfileLimitsModel>;
    private usageChart: ElementRef;

    @ViewChildren('usageChart', { read: ViewContainerRef })
    viewContainerRefs;
    limit: any;

    constructor(
        private _store: Store<ApplicationState>,
        private _service: ProfileService,
        private _imageService: ImageService,
        private _router: Router,
        private _zone: NgZone
    ) {
        super();
        this.profile$ = _store.select(fromProfile.getProfile);
        this.profile$.skip(1).subscribe((p) => {
            this.originalSlug = p.slug;
            this.image.src = p.profileImage;
        });
    }
    ngAfterViewInit() {
        this._service.getLimits().subscribe((l) => {
            this.limit = l;
            this.viewContainerRefs.changes.subscribe((r) => {
                if (this.viewContainerRefs.length !== 0) {
                    const el = r.first.element.nativeElement;
                    this._zone.runOutsideAngular(() => {
                        jQuery(el).easyPieChart({
                            easing: 'easeOutBounce',
                            onStep: function(from, to, percent) {
                                jQuery(el)
                                    .find('.percent')
                                    .text(Math.round(percent));
                            },
                            barColor: jQuery(this).attr('data-rel'),
                            trackColor: 'rgba(0,0,0,0)',
                            size: 84,
                            scaleLength: 0,
                            animation: 2000,
                            lineWidth: 9,
                            lineCap: 'round'
                        });
                    });
                }
            });
        });

        const searchBox = document.getElementById('slug-box');

        const typeahead = fromEvent(searchBox, 'input').pipe(
            map((e: KeyboardEvent) => e.target.value),
            filter((text) => text.length > 2),
            debounceTime(10),
            distinctUntilChanged(),
            switchMap((v) => this.onSlugChanged(v))
        );
        typeahead.subscribe((data) => {
            // Handle the data from the API
        });
    }

    private _parseImageData(file: File) {
        const myReader: FileReader = new FileReader();
        myReader.onloadend = (loadEvent: any) => {
            this.image = new Image();
            this.image.src = loadEvent.target.result;
            this.imageChanged = true;
        };
        myReader.readAsDataURL(file);
    }
    onSlugChanged(slug: string) : boolean {
        this._service.checkSlug(slug).subscribe((v) => {
            console.log('profile.component.ts', 'onSlugChanged', v);
            if (v) this.slugError = '';
            else this.slugError = 'Slug already exists';
        });
    }
    uploadPhoto(podcast) {
        const nativeElement: HTMLInputElement = this.fileInput.nativeElement;
        return this._imageService.upload(podcast.slug, this._imageFileBuffer);
    }

    fileChangeEvent() {
        const nativeElement: HTMLInputElement = this.fileInput.nativeElement;
        this._imageFileBuffer = nativeElement.files[0];
        this._parseImageData(this._imageFileBuffer);
    }

    callFileInput() {
        this.fileInput.nativeElement.click();
    }

    regenerateApiKey(profile: ProfileModel) {
        this._service.regenerateApiKey().subscribe((a) => (profile.apiKey = a));
    }
    doSave(profile: ProfileModel) {
        // TODO: Updating slug is adding new User
        if (this.slugError === 'CHANGETHIS') {
            this._store.dispatch(new fromProfileActions.UpdateAction(profile));
        }
        this._service.updateProfile(profile).subscribe((r) => {
            this._store.dispatch(new fromProfileActions.UpdateAction(profile));
            this._router.navigate(['']);
        });
    }
}
