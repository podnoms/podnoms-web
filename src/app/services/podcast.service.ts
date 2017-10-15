import { PodcastEntryModel } from 'app/models/podcasts.models';
import { PodcastModel } from './../models/podcasts.models';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class PodcastService {
    static _replacer(key, value) {
        if (key === 'imageUrl') {
            return undefined;
        }
        return value;
    }
    constructor(private _http: AuthHttp) { }
//#region Podcasts
    get(): Observable<PodcastModel[]> {
        return this._http.get('api/podcast/')
            .map(res => res.json());
    }
    getPodcast(slug: string): Observable<PodcastModel> {
        return this._http.get('api/podcast/' + slug)
            .map(res => res.json());
    }
    addPodcast(podcast: PodcastModel): Observable<PodcastModel> {
        console.log('PodcastService', 'addPodcast', podcast);
        const data = JSON.stringify(podcast, PodcastService._replacer);
        return this._http.post('api/podcast', data)
            .map(res => res.json());
    }
//#endregion
//#region Entries
    getEntries(slug: string): any {
        return this._http.get('api/entry/all/' + slug)
            .map(res => res.json());
    }
    addEntry(podcastId: number, sourceUrl: string) {
        const entry = new PodcastEntryModel(podcastId, sourceUrl);
        return this._http.post('api/entry', JSON.stringify(entry))
            .map(res => res.json());
    }
    updateEntry(entry: PodcastEntryModel) {
        console.log('PodcastService: addPodcastEntry', entry);
        return this._http.post('api/entry', JSON.stringify(entry))
            .map(res => res.json());
    }
    deleteEntry(id: number) {
        console.log('PodcastService: deletePodcastEntry', id);
        return this._http.delete('api/entry/' + id);
    }
//#endregion
}
