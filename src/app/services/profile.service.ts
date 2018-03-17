import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProfileModel } from 'app/models/profile.model';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { Profile } from 'selenium-webdriver/firefox';

@Injectable()
export class ProfileService {
    constructor(private _http: AuthHttp) {}
    profile: ProfileModel;

    getProfile(): Observable<ProfileModel> {
        if (!this.profile) {
            return this._http
                .get(environment.API_HOST + '/profile')
                .map(res => {
                    this.profile = res.json();
                    return this.profile;
                });
        } else {
            return Observable.of(this.profile);
        }
    }

    updateProfile(profile): Observable<ProfileModel> {
        console.log('ProfileService', 'updateProfile', profile);
        return this._http
            .post(environment.API_HOST + '/profile', profile)
            .map(res => res.json());
    }

    checkSlug(slug): Observable<string> {
        console.log('profile.service.ts', 'checkSlug', slug);
        return this._http
            .get(environment.API_HOST + '/profile/checkslug/' + slug)
            .map(res => res.text());
    }
    regenerateApiKey(): Observable<string> {
        return this._http
            .post(environment.API_HOST + '/profile/updateapikey', null)
            .map(res => res.text());
    }
}
