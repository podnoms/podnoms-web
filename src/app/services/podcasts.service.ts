import { PodcastModel } from './../models/podcasts.models';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PodcastsService {
    constructor(private _http: AuthHttp) { }
    get(): Observable<PodcastModel[]> {
        return this._http.get('api/podcast/')
            .map(res => res.json());
    }
    getPodcast(slug: string): Observable<PodcastModel> {
        return this._http.get('api/podcast/' + slug)
            .map(res => res.json());
    }
    // Entries
    deleteEntry(slug: string) {
        console.log('PodcastService: deletePodcastEntry', slug);
        return this._http.delete('api/entry/' + slug);
    }
}
