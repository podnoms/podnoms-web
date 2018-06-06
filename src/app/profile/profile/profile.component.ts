import {
    Component,
    OnInit,
    AfterViewInit,
    ElementRef,
    ViewChild,
    ViewContainerRef,
    ViewChildren
} from '@angular/core';
import { Profile, ProfileLimits, ToastService } from '../../core';
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
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileDataService } from '../profile-data.service';
import { ProfileStoreService } from '../profile-store.service';
import { ImageUploadComponent } from '../../shared/components/image-upload/image-upload.component';
import { UUID } from 'angular2-uuid';
declare let jQuery: any;

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BasePageComponent implements AfterViewInit {
    @ViewChild('imageControl') imageControl: ImageUploadComponent;

    profile$: Observable<Profile>;
    destroy$ = new Subject();

    searchTerm$ = new Subject<string>();

    originalSlug: string;
    slugError: string = '';

    sending = false;

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
        private toastService: ToastService,
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
    }

    ngAfterViewInit() {
        this.refreshLimits();
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
    regenerateApiKey(profile: Profile) {
        // this._service.regenerateApiKey().subscribe(a => (profile.apiKey = a));
    }
    doSave(profile: Profile) {
        this.profileDataService.updateProfile(profile).subscribe(p => {
            this.imageControl.commitImage(p.id, 'profile').subscribe(r => {
                profile.profileImage = `${r}?v=${UUID.UUID()}`;
                this.profileStoreService.updateOneInCache(profile);
                this.toastService.showToast('Success', 'Profile updated successfully');
            });
        });
    }
}
