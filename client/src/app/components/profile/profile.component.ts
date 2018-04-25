import { ProfileService } from 'app/services/profile.service';
import { Store } from '@ngrx/store';
import { ApplicationState } from './../../store/index';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { ProfileModel } from 'app/models/profile.model';
import * as fromProfile from 'app/reducers';
import * as fromProfileActions from 'app/actions/profile.actions';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    originalSlug: string;
    slugError: string = '';
    profile$: Observable<ProfileModel>;
    constructor(
        private _store: Store<ApplicationState>,
        private _service: ProfileService,
        private _router: Router
    ) {
        _store.dispatch(new fromProfileActions.LoadAction());
        this.profile$ = _store.select(fromProfile.getProfile);
        this.profile$.skip(1).subscribe((p) => (this.originalSlug = p.slug));
    }
    ngOnInit() {}
    onSlugChanged(slug: string) {
        this._service.checkSlug(slug).subscribe((v) => {
            console.log('profile.component.ts', 'onSlugChanged', v);
            if (v === 'Found' && slug !== this.originalSlug) {
                this.slugError = 'Slug already exists';
            } else {
                this.slugError = '';
            }
        });
    }
    regenerateApiKey(profile: ProfileModel) {
        this._service.regenerateApiKey().subscribe((a) => (profile.apiKey = a));
    }
    doSave(profile: ProfileModel) {
        this._router.navigate(['']);
        // TODO: Updating slug is adding new User
        if (this.slugError === 'CHANGETHIS') {
            this._store.dispatch(new fromProfileActions.UpdateAction(profile));
        }
    }
}
