import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Podcast, PodcastEntry } from '../core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
@Injectable()
export class PodcastDataService {
    static _replacer(key, value) {
        if (key === 'imageUrl') {
            return undefined;
        }
        return value;
    }
    constructor(private _http: HttpClient) {}
    //#region Podcasts
    get(): Observable<Podcast[]> {
        return this._http.get<Podcast[]>(environment.apiHost + '/podcast/');
    }
    getPodcast(slug: string): Observable<Podcast> {
        return this._http.get<Podcast>(environment.apiHost + '/podcast/' + slug);
    }
    addPodcast(podcast: Podcast): Observable<Podcast> {
        console.log('PodcastService', 'addPodcast', podcast);
        const data = JSON.stringify(podcast, PodcastDataService._replacer);
        return this._http.post<Podcast>(environment.apiHost + '/podcast', data);
    }
    updatePodcast(podcast: Podcast) {
        return this._http.put(environment.apiHost + '/podcast/', podcast);
    }
    deletePodcast(id: string): Observable<boolean> {
        return this._http
            .delete<Response>(environment.apiHost + '/podcast/' + id)
            .pipe(map(r => r.status === 200));
    }
    //#endregion
    //#region Entries

    getAllEntriesForUser(): Observable<PodcastEntry[]> {
        return this._http.get<PodcastEntry[]>(environment.apiHost + '/entry/users/');
    }
    getEntries(slug: string): Observable<PodcastEntry[]> {
        return this._http.get<PodcastEntry[]>(environment.apiHost + '/entry/all/' + slug);
    }
    addEntry(entry: PodcastEntry): Observable<PodcastEntry> {
        return this._http.post<PodcastEntry>(
            environment.apiHost + '/entry',
            JSON.stringify(entry)
        );
    }
    updateEntry(entry: PodcastEntry) {
        return this._http.post<PodcastEntry>(
            environment.apiHost + '/entry',
            JSON.stringify(entry)
        );
    }
    deleteEntry(id: string): Observable<boolean> {
        return this._http
            .delete<Response>(environment.apiHost + '/entry/' + id)
            .pipe(map(r => r.status === 200));
    }
    checkEntry(url: string): Observable<boolean> {
        return this._http
            .post<Response>(environment.apiHost + '/entry/isvalid/', `"${url}"`)
            .pipe(
                map(r => r.status === 200),
                catchError((error: any) => {
                    return observableThrowError(new Error(error.status));
                })
            );
    }
    reSubmitEntry(entry: PodcastEntry): Observable<PodcastEntry> {
        return this._http.post<PodcastEntry>(environment.apiHost + '/entry/resubmit', entry);
    }
    //#endregion

    //#region Playlists
    addPlaylist(entry: PodcastEntry) {
        return this._http.post<PodcastEntry>(
            environment.apiHost + '/playlist',
            JSON.stringify(entry)
        );
    }
    //#endregion
}
