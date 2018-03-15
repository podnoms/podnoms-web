import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import { environment } from 'environments/environment';

@Injectable()
export class ImageService {

    // TODO: Change this to use AuthHttp when I can figure out why formData is null
    constructor(private _http: Http, private _auth: AuthService) {
    }

    upload(podcastSlug: string, image) {
        const formData = new FormData();
        formData.append('file', image);
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this._auth.getToken());
        return this._http.post(`${environment.API_HOST}/podcast/${podcastSlug}/imageupload`, formData, {headers: headers});
    }
}
