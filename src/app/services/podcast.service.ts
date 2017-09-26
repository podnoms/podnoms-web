import 'rxjs/add/operator/map';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PodcastEntryModel, PodcastModel } from '../models/podcasts.models';
import { AuthHttp } from 'angular2-jwt';
import { Store } from '@ngrx/store';

@Injectable()
export class PodcastService {

    podcasts: Observable<Array<PodcastModel>>;
    selectedPodcast: Observable<PodcastModel>;

    // bit hacky but need to remove image as this will be uploaded separately.
    static _replacer(key, value) {
        if (key === 'imageUrl') {
            return undefined;
        }
        return value;
    }

    constructor(private _http: AuthHttp) {
    }

    loadPodcasts() {
        this._http.get('api/podcast/')
            .map(res => res.json())
            .map(payload => ({ type: 'ADD_ITEMS', payload }));
    }

    addPodcast(podcast: PodcastModel) {
        console.log('PodcastService', 'addPodcast', podcast);
        const data = JSON.stringify(podcast, PodcastService._replacer);
        this._http.post('api/podcast', data)
            .map(res => res.json())
            .map(payload => ({ type: 'CREATE_ITEM', payload: payload }));
    }

    deletePodcast(id: number) {
        return this._http.delete('api/podcast/' + id);
    }

    addPodcastEntry(entry: PodcastEntryModel) {
        console.log('PodcastService: addPodcastEntry', entry);
        this._http.post('api/entry', JSON.stringify(entry))
            .map(res => res.json())
            .map(payload => ({ type: 'ADD_ENTRY', payload: payload }));
    }

    deletePodcastEntry(id: number) {
        console.log('PodcastService: deletePodcastEntry', id);
        return this._http.delete('api/entry/' + id);
    }
}
