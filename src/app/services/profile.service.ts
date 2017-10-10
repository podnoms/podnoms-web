import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ProfileModel} from '../models/profile.model';
import {AuthHttp} from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {

    constructor(private _http: AuthHttp) {

    }

    getProfile(): Observable<ProfileModel> {
        return this._http.get('api/profile')
            .map(res => res.json());
    }

    updateProfile(profile): Observable<ProfileModel> {
        console.log('ProfileService', 'updateProfile', profile);
        return this._http.post('/profile', profile)
            .map(res => res.json());
    }
}
