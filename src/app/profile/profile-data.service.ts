import { Injectable } from '@angular/core';
import {
  Profile,
  ProfileLimits,
  Payment,
  ApiKeyRequestModel,
  Subscription,
  Podcast,
} from '../core';

import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import { DefaultDataService, HttpMethods, HttpUrlGenerator } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class ProfileDataService extends DefaultDataService<Profile> {
  profile: Profile;
  constructor(
    http: HttpClient,
    private authService: AuthService,
    protected logger: NGXLogger,
    httpUrlGenerator: HttpUrlGenerator
  ) {
    super('Profile', http, httpUrlGenerator);
  }
  execute(
    method: HttpMethods,
    url: string,
    data?: any,
    options?: any
  ): Observable<any> {
    // TODO: Big badda bug!!!
    // this is a hack to convert API singleton to ngrx collection
    // plz fix at earliest convenience
    const call = super.execute(method, url, data, options);
    if (method === 'GET') {
      return call.pipe(
        map((r) => {
          this.logger.debug('profile-data.service', 'execute', r);
          return Array.of(r);
        })
      );
    }
    return call;
  }
  // getAll(): Observable<Profile[]> {
  //     return super.getAll().pipe(
  //         map((r) => {
  //             const arrayIfied = Array.of(r);
  //             return arrayIfied;
  //         })
  //     );
  // }
  getProfile(): Observable<Profile> {
    if (this.authService.isLoggedIn()) {
      if (!this.profile) {
        return this.http.get<Profile>(environment.apiHost + '/profile').pipe(
          map((res) => {
            this.profile = res;
            return this.profile;
          })
        );
      } else {
        return of(this.profile);
      }
    } else {
      return of(null);
    }
  }
  updateProfile(profile): Observable<Profile> {
    this.logger.debug('ProfileService', 'updateProfile', profile);
    return this.http.post<Profile>(environment.apiHost + '/profile', profile);
  }
  getSubscriptionLevel(): Observable<Subscription> {
    return this.http.get<Subscription>(
      `${environment.apiHost}/profile/subscription`
    );
  }
  getKeys(): Observable<ApiKeyRequestModel[]> {
    return this.http.get<ApiKeyRequestModel[]>(
      `${environment.apiHost}/profile/getkeys`
    );
  }
  checkEmail(slug): Observable<boolean> {
    this.logger.debug('profile.service.ts', 'checkSlug', slug);
    return this.http.get<boolean>(
      environment.apiHost + '/profile/checkemail/' + slug
    );
  }
  checkSlug(slug): Observable<boolean> {
    this.logger.debug('profile.service.ts', 'checkSlug', slug);
    return this.http.get<boolean>(
      environment.apiHost + '/profile/checkslug/' + slug
    );
  }
  checkUserNeedsRedirect(): Observable<HttpResponse<any>> {
    return this.http.get<any>(environment.apiHost + '/profile/needsredirect', {
      observe: 'response',
    });
  }
  regenerateKey(model: ApiKeyRequestModel): Observable<ApiKeyRequestModel> {
    return this.http.post<ApiKeyRequestModel>(
      environment.apiHost + '/profile/regeneratekey',
      model
    );
  }
  requestNewKey(model: ApiKeyRequestModel): Observable<ApiKeyRequestModel> {
    return this.http.post<ApiKeyRequestModel>(
      environment.apiHost + '/profile/requestkey',
      model
    );
  }
  getLimits(): Observable<ProfileLimits> {
    return this.http.get<ProfileLimits>(
      environment.apiHost + '/profile/limits'
    );
  }
  getOpml(): Observable<string> {
    return this.http.get(environment.apiHost + '/podcast/opml', {
      observe: 'body',
      responseType: 'text',
    });
  }
  getPublicOpmlUrl(): Observable<string> {
    return this.http.get(environment.apiHost + '/profile/opml-url', {
      observe: 'body',
      responseType: 'text',
    });
  }
}
