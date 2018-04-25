import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProfileModel } from 'app/models/profile.model';
import 'rxjs/add/operator/map';
import { Profile } from 'selenium-webdriver/firefox';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProfileService {
    profile: ProfileModel;
    constructor(private _http: HttpClient) {}

    getProfile(): Observable<ProfileModel> {
        if (!this.profile) {
            return this._http
                .get<ProfileModel>(environment.API_HOST + '/profile')
                .map((res) => {
                    this.profile = res;
                    return this.profile;
                });
        } else {
            return Observable.of(this.profile);
        }
    }

    updateProfile(profile): Observable<ProfileModel> {
        console.log('ProfileService', 'updateProfile', profile);
        return this._http.post<ProfileModel>(
            environment.API_HOST + '/profile',
            profile
        );
    }

    checkSlug(slug): Observable<string> {
        console.log('profile.service.ts', 'checkSlug', slug);
        return this._http.get<string>(
            environment.API_HOST + '/profile/checkslug/' + slug
        );
    }
    regenerateApiKey(): Observable<string> {
        return this._http.post<string>(
            environment.API_HOST + '/profile/updateapikey',
            null
        );
    }
}
