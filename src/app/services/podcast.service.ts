import 'rxjs/add/operator/map';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PodcastEntryModel, PodcastModel } from '../models/podcasts.models';
import { AuthHttp } from 'angular2-jwt';
import { Subscription } from "rxjs";
import { AppStore } from '../models/app.store';
import { Store } from "@ngrx/store";

@Injectable()
export class PodcastService {

    podcasts: Observable<Array<PodcastModel>>;

    constructor(private _http: AuthHttp, private _store: Store<AppStore>) {
        this.podcasts = _store.select('podcasts');
    }

    //bit hacky but need to remove image as this will be uploaded separately.
    static _replacer(key, value) {
        if (key === 'imageUrl') return undefined;
        else return value;
    }

    loadPodcasts(/*slug: string*/) {
        this._http.get('api/podcast/')
            .map(res => res.json())
            .map(payload => ({type: 'ADD_ITEMS', payload}))
            .subscribe(action => this._store.dispatch(action));
    }

    addPodcast(podcast: PodcastModel): Observable<PodcastModel> {
        console.log('PodcastService', 'addPodcast', podcast);
        return this._http.post('api/podcast', JSON.stringify(podcast, PodcastService._replacer))
            .map(res => {
                return res.json();
            });
    }

    deletePodcast(id: number) {
        return this._http.delete('api/podcast/' + id);
    }

    addPodcastEntry(entry: PodcastEntryModel): Observable<PodcastEntryModel> {
        console.log('PodcastService: addPodcastEntry', entry);
        return this._http.post('api/entry', JSON.stringify(entry))
            .map(res => res.json());
    }

    deletePodcastEntry(id: number) {
        console.log('PodcastService: deletePodcastEntry', id);
        return this._http.delete('api/entry/' + id);
    }
}
