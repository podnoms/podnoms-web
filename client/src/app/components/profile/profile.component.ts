import { ProfileService } from 'app/services/profile.service';
import { Store } from '@ngrx/store';
import { ApplicationState } from './../../store/index';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProfileModel } from 'app/models/profile.model';
import * as fromProfile from 'app/reducers';
import * as fromProfileActions from 'app/actions/profile.actions';
import { Router } from '@angular/router';
import { ImageService } from 'app/services/image.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    profile$: Observable<ProfileModel>;

    originalSlug: string;
    slugError: string = '';

    private imageChanged = false;
    image: any = new Image();
    sending = false;
    _imageFileBuffer: File;

    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(
        private _store: Store<ApplicationState>,
        private _service: ProfileService,
        private _imageService: ImageService,
        private _router: Router
    ) {
        this.profile$ = _store.select(fromProfile.getProfile);
        this.profile$.skip(1).subscribe((p) => {
            this.originalSlug = p.slug;
            this.image.src = p.profileImage;
        });
    }
    ngOnInit() {}

    private _parseImageData(file: File) {
        const myReader: FileReader = new FileReader();
        myReader.onloadend = (loadEvent: any) => {
            this.image = new Image();
            this.image.src = loadEvent.target.result;
            this.imageChanged = true;
        };
        myReader.readAsDataURL(file);
    }
    onSlugChanged(slug: string) {
        this._service.checkSlug(slug).subscribe((v) => {
            console.log('profile.component.ts', 'onSlugChanged', v);
            if (v.status == 404) this.slugError = '';
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
