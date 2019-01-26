import { Injectable } from '@angular/core';
import { Profile, ProfileLimits, Payment } from '../core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProfileDataService {

    profile: Profile;
    constructor(private http: HttpClient, private authService: AuthService) {}

    getProfile(): Observable<Profile> {
        if (this.authService.isLoggedIn()) {
            if (!this.profile) {
                return this.http.get<Profile>(environment.apiHost + '/profile').pipe(
                    map(res => {
                        this.profile = res;
                        return this.profile;
                    })
                );
            } else {
                return of(this.profile);
            }
        } else { return of(null); }
    }
    updateProfile(profile): Observable<Profile> {
        console.log('ProfileService', 'updateProfile', profile);
        return this.http.post<Profile>(environment.apiHost + '/profile', profile);
    }
    checkSlug(slug): Observable<boolean> {
        console.log('profile.service.ts', 'checkSlug', slug);
        return this.http.get<boolean>(environment.apiHost + '/profile/checkslug/' + slug);
    }
    regenerateApiKey(): Observable<string> {
        return this.http.post<string>(environment.apiHost + '/profile/updateapikey', null);
    }
    getLimits(): Observable<ProfileLimits> {
        return this.http.get<ProfileLimits>(environment.apiHost + '/profile/limits');
    }
}
