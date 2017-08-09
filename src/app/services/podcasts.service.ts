import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PodcastEntryModel, PodcastModel } from '../models/podcasts.models';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class PodcastsService {

    constructor(private _http: AuthHttp) {

    }

    //bit hacky but need to remove image as this will be uploaded separately.
    _replacer(key, value) {
        if (key === 'imageUrl') return undefined;
        else return value;
    }

    getPodcasts(): Observable<PodcastModel[]> {
        return this._http.get('api/podcast')
            .map(res => res.json());
    }

    getPodcast(slug: string): Observable<PodcastModel> {
        return this._http.get('api/podcast/' + slug)
            .map(res => res.json());
    }

    addPodcast(podcast: PodcastModel): Observable<PodcastModel> {
        console.log('PodcastsService', 'addPodcast', podcast);
        return this._http.post('api/podcast', JSON.stringify(podcast, this._replacer))
            .map(res => {
                return res.json();
            });
    }

    deletePodcast(id: number) {
        return this._http.delete('api/podcast/' + id);
    }

    addPodcastEntry(entry: PodcastEntryModel): Observable<PodcastEntryModel> {
        console.log('PodcastsService: addPodcastEntry', entry);
        return this._http.post('api/entry', JSON.stringify(entry))
            .map(res => res.json());
    }

    deletePodcastEntry(id: number) {
        console.log('PodcastsService: deletePodcastEntry', id);
        return this._http.delete('api/entry/' + id);
    }
}
