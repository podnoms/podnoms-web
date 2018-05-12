import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProfileModel } from 'app/models/profile.model';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { PodnomsAuthService } from './podnoms-auth.service';
import { ProfileLimitsModel } from 'app/models/profile.limits';

@Injectable()
export class ProfileService {
    profile: ProfileModel;
    constructor(
        private _http: HttpClient,
        private _authService: PodnomsAuthService
    ) {}

    getProfile(): Observable<ProfileModel> {
        if (this._authService.isAuthenticated()) {
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
        } else return Observable.of(null);
    }

    updateProfile(profile): Observable<ProfileModel> {
        console.log('ProfileService', 'updateProfile', profile);
        return this._http.post<ProfileModel>(
            environment.API_HOST + '/profile',
            profile
        );
    }

    checkSlug(slug): Observable<Response> {
        console.log('profile.service.ts', 'checkSlug', slug);
        return this._http.get<Response>(
            environment.API_HOST + '/profile/checkslug/' + slug
        );
    }
    regenerateApiKey(): Observable<string> {
        return this._http.post<string>(
            environment.API_HOST + '/profile/updateapikey',
            null
        );
    }
    getLimits(): Observable<ProfileLimitsModel> {
        return this._http.get<ProfileLimitsModel>(
            environment.API_HOST + '/profile/limits'
        );
    }
}
