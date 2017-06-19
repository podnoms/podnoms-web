import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class ImageService {

    constructor(private _http: AuthHttp) {
    }

    upload(podcastId, image) {
        const formData = new FormData();
        formData.append('file', image);
        return this._http.post(`/api/podcast/${podcastId}/image`, formData)
            .map(res => res.json());
    }
}
