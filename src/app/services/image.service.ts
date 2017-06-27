import { Http } from '@angular/http';
import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class ImageService {

    //TODO: Change this to use AuthHttp when I can figure out why formData is null
    constructor(private _http: Http) {
    }

    upload(podcastId, image) {
        const formData = new FormData();
        formData.append('file', image);
        return this._http.post(`/api/podcast/${podcastId}/image`, formData)
            .map(res => res.json());
    }
}
