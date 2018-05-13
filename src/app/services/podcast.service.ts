import { environment } from 'environments/environment';
import { PodcastEntryModel } from 'app/models/podcasts.models';
import { PodcastModel } from './../models/podcasts.models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PodcastService {
    static _replacer(key, value) {
        if (key === 'imageUrl') {
            return undefined;
        }
        return value;
    }
    constructor(private _http: HttpClient) {}
    //#region Podcasts
    get(): Observable<PodcastModel[]> {
        return this._http.get<PodcastModel[]>(
            environment.API_HOST + '/podcast/'
        );
    }
    getPodcast(slug: string): Observable<PodcastModel> {
        return this._http.get<PodcastModel>(
            environment.API_HOST + '/podcast/' + slug
        );
    }
    addPodcast(podcast: PodcastModel): Observable<PodcastModel> {
        console.log('PodcastService', 'addPodcast', podcast);
        const data = JSON.stringify(podcast, PodcastService._replacer);
        return this._http.post<PodcastModel>(
            environment.API_HOST + '/podcast',
            data
        );
    }
    updatePodcast(podcast: PodcastModel) {
        return this._http.put(environment.API_HOST + '/podcast/', podcast);
    }
    deletePodcast(id: number) {
        return this._http.delete(environment.API_HOST + '/podcast/' + id);
    }
    //#endregion
    //#region Entries

    getAllEntriesForUser(): Observable<PodcastEntryModel[]> {
        return this._http.get<PodcastEntryModel[]>(
            environment.API_HOST + '/entry/users/'
        );
    }
    getEntries(slug: string): Observable<PodcastEntryModel[]> {
        return this._http.get<PodcastEntryModel[]>(environment.API_HOST + '/entry/all/' + slug);
    }
    addEntry(entry: PodcastEntryModel): Observable<PodcastEntryModel> {
        return this._http.post<PodcastEntryModel>(
            environment.API_HOST + '/entry',
            JSON.stringify(entry)
        );
    }
    updateEntry(entry: PodcastEntryModel) {
        return this._http.post<PodcastEntryModel>(
            environment.API_HOST + '/entry',
            JSON.stringify(entry)
        );
    }
    deleteEntry(id: number) {
        return this._http.delete(environment.API_HOST + '/entry/' + id);
    }
    checkEntry(url: string): Observable<boolean> {
        return this._http
            .post<Response>(
                environment.API_HOST + '/entry/isvalid/',
                `"${url}"`
            )
            .map((r) => (r.status == 200 ? true : false))
            .catch((error: any) => {
                return Observable.throw(new Error(error.status));
            });
    }
    reSubmitEntry(entry: PodcastEntryModel): Observable<PodcastEntryModel> {
        return this._http.post<PodcastEntryModel>(
            environment.API_HOST + '/entry/resubmit',
            entry
        );
    }
    //#endregion

    //#region Playlists
    addPlaylist(entry: PodcastEntryModel) {
        return this._http.post<PodcastEntryModel>(
            environment.API_HOST + '/playlist',
            JSON.stringify(entry)
        );
    }
    //#endregion
}
