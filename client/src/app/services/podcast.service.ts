import { environment } from 'environments/environment';
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
        return this._http
            .get(environment.API_HOST + '/podcast/')
            .map(res => res.json());
    }
    getPodcast(slug: string): Observable<PodcastModel> {
        return this._http
            .get(environment.API_HOST + '/podcast/' + slug)
            .map(res => res.json());
    }
    addPodcast(podcast: PodcastModel): Observable<PodcastModel> {
        console.log('PodcastService', 'addPodcast', podcast);
        const data = JSON.stringify(podcast, PodcastService._replacer);
        return this._http
            .post(environment.API_HOST + '/podcast', data)
            .map(res => res.json());
    }
    updatePodcast(podcast: PodcastModel) {
        return this._http.put(environment.API_HOST + '/podcast/', podcast);
    }
    deletePodcast(id: number) {
        return this._http.delete(environment.API_HOST + '/podcast/' + id);
    }
    //#endregion
    //#region Entries
    getEntries(slug: string): any {
        return this._http
            .get(environment.API_HOST + '/entry/all/' + slug)
            .map(res => res.json());
    }
    addEntry(entry: PodcastEntryModel) {
        return this._http
            .post(environment.API_HOST + '/entry', JSON.stringify(entry))
            .map(res => res.json());
    }
    updateEntry(entry: PodcastEntryModel) {
        return this._http
            .post(environment.API_HOST + '/entry', JSON.stringify(entry))
            .map(res => res.json());
    }
    deleteEntry(id: number) {
        return this._http.delete(environment.API_HOST + '/entry/' + id);
    }
    checkEntry(url: string): Observable<boolean> {
        return this._http
            .post(environment.API_HOST + '/entry/isvalid/', `"${url}"`)
            .map(r => (r.status == 200 ? true : false))
            .catch((error: any) => {
                return Observable.throw(new Error(error.status));
            });
    }
    reSubmitEntry(entry: PodcastEntryModel): Observable<PodcastEntryModel> {
        return this._http
            .post(environment.API_HOST + '/entry/resubmit', entry)
            .map(res => res.json());
    }
    //#endregion

    //#region Playlists
    addPlaylist(entry: PodcastEntryModel) {
        return this._http
            .post(environment.API_HOST + '/playlist', JSON.stringify(entry))
            .map(res => res.json());
    }
    //#endregion
}
