import { PodcastEntryModel } from 'app/models/podcasts.models';
import { PodcastModel } from './../models/podcasts.models';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class PodcastService {
    constructor(private _http: AuthHttp) { }
    get(): Observable<PodcastModel[]> {
        return this._http.get('api/podcast/')
            .map(res => res.json());
    }
    getPodcast(slug: string): Observable<PodcastModel> {
        return this._http.get('api/podcast/' + slug)
            .map(res => res.json());
    }
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
    deleteEntry(slug: string) {
        console.log('PodcastService: deletePodcastEntry', slug);
        return this._http.delete('api/entry/' + slug);
    }
    //#endregion
}
