import {
    Component,
    OnInit,
    AfterViewInit,
    ElementRef,
    ViewChild,
    ViewContainerRef,
    ViewChildren
} from '@angular/core';
import { Profile, ProfileLimits } from '../../core';
import { BasePageComponent } from '../../shared/components/base-page/base-page.component';
import {
    debounceTime,
    distinctUntilChanged,
    delay,
    map,
    shareReplay,
    startWith,
    takeUntil,
    skip,
    switchMap
} from 'rxjs/operators';
import { combineLatest, BehaviorSubject, Observable, Subject } from 'rxjs';
import { ProfileStoreService } from '../profile-store.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileDataService } from '../profile-data.service';
import { ImageService } from '../../shared/services/image.service';
declare let jQuery: any;

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BasePageComponent implements AfterViewInit {
    profile$: Observable<Profile>;
    destroy$ = new Subject();

    searchTerm$ = new Subject<string>();

    originalSlug: string;
    slugError: string = '';

    private imageChanged = false;
    image: any = new Image();
    sending = false;
    _imageFileBuffer: File;

    @ViewChild('fileInput') fileInput: ElementRef;
    limits$: Observable<ProfileLimits>;
    private usageChart: ElementRef;

    @ViewChildren('usageChart', { read: ViewContainerRef })
    viewContainerRefs;
    limit: any;

    slugging: boolean = false;

    constructor(
        private profileStoreService: ProfileStoreService,
        private profileDataService: ProfileDataService,
        private imageService: ImageService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        super();
        console.log('profile.component', 'loading', new Date().getTime());
        this.searchTerm$
            .pipe(
                debounceTime(400),
                distinctUntilChanged(),
                switchMap(term => this.profileDataService.checkSlug(term))
            )
            .subscribe(r => {
                if (r) {
                    this.slugError = '';
                } else {
                    this.slugError = 'Slug already exists';
                }
                this.slugging = false;
            });
        this.profile$ = this.profileStoreService.entities$.pipe(
            map(r => r.filter(it => it.slug !== null)[0])
        );
        this.profile$.subscribe(r => {
            if (r) {
                this.image.src = r.profileImage;
            }
        });
    }

    ngAfterViewInit() {
        this.refreshLimits();
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
    refreshLimits() {
        this.profileDataService.getLimits().subscribe(l => {
            this.limit = l;
            if (
                this.viewContainerRefs.changes.observers &&
                this.viewContainerRefs.changes.observers.length === 0
            ) {
                const subscription = this.viewContainerRefs.changes.subscribe(r => {
                    if (this.viewContainerRefs.length !== 0) {
                        const el = r.first.element.nativeElement;
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
                    }
                });
            }
        });
    }
    uploadPhoto(podcast) {
        const nativeElement: HTMLInputElement = this.fileInput.nativeElement;
        return this.imageService.upload(podcast.slug, this._imageFileBuffer);
    }

    fileChangeEvent() {
        const nativeElement: HTMLInputElement = this.fileInput.nativeElement;
        this._imageFileBuffer = nativeElement.files[0];
        this._parseImageData(this._imageFileBuffer);
    }

    callFileInput() {
        this.fileInput.nativeElement.click();
    }

    regenerateApiKey(profile: Profile) {
        // this._service.regenerateApiKey().subscribe(a => (profile.apiKey = a));
    }
    doSave(profile: Profile) {
        // TODO: Updating slug is adding new User
        this.profileDataService.updateProfile(profile).subscribe(p => {
            this.profileStoreService.updateOneInCache(profile);
            this.router.navigate(['']);
        });
    }
}
