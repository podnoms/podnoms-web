import {
    Component,
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
    map,
    switchMap
} from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ProfileDataService } from '../profile-data.service';
import { ProfileStoreService } from '../profile-store.service';
import { ImageUploadComponent } from '../../shared/components/image-upload/image-upload.component';
import { UUID } from 'angular2-uuid';

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

    @ViewChildren('usageChart', { read: ViewContainerRef })
    viewContainerRefs;
    limit: any;

    slugging: boolean = false;

    constructor(
        private profileStoreService: ProfileStoreService,
        private profileDataService: ProfileDataService,
        private toastService: ToastService    ) {
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
            }
        });
    }
    regenerateApiKey() {
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
