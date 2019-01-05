import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, Logger, QueryParams } from 'ngrx-data';
import { PodcastEntry } from '../core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError as observableThrowError, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EntryDataService extends DefaultDataService<PodcastEntry> {
    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
        super('Entry', http, httpUrlGenerator);
    }

    getWithQuery(queryParams: QueryParams | string): Observable<PodcastEntry[]> {
        const params = new HttpParams();
        return this.execute('GET', `${this.entitiesUrl}all/${queryParams['podcastSlug']}`, undefined, params);
    }

    getAllEntriesForUser(): Observable<PodcastEntry[]> {
        return this.http.get<PodcastEntry[]>(environment.apiHost + '/entry/users/');
    }
    getEntry(id: string): Observable<PodcastEntry> {
        return this.http.get<PodcastEntry>(environment.apiHost + '/entry/' + id);
    }
    getEntries(slug: string): Observable<PodcastEntry[]> {
        return this.http.get<PodcastEntry[]>(environment.apiHost + '/entry/all/' + slug);
    }
    addEntry(entry: PodcastEntry): Observable<PodcastEntry> {
        return this.http.post<PodcastEntry>(environment.apiHost + '/entry', JSON.stringify(entry));
    }
    updateEntry(entry: PodcastEntry) {
        return this.http.post<PodcastEntry>(environment.apiHost + '/entry', JSON.stringify(entry));
    }
    deleteEntry(id: string): Observable<boolean> {
        return this.http
            .delete<Response>(environment.apiHost + '/entry/' + id, { observe: 'response' })
            .pipe(map(r => r && r.status === 200));
    }
    checkEntry(url: string): Observable<boolean> {
        return this.http.post<Response>(environment.apiHost + '/entry/isvalid/', `"${url}"`).pipe(
            map(r => r.status === 200),
            catchError((error: any) => {
                return observableThrowError(new Error(error.status));
            })
        );
    }
    reSubmitEntry(entry: PodcastEntry): Observable<PodcastEntry> {
        return this.http.post<PodcastEntry>(environment.apiHost + '/entry/resubmit', entry);
    }
    //#endregion

    //#region Playlists
    addPlaylist(entry: PodcastEntry) {
        return this.http.post<PodcastEntry>(environment.apiHost + '/playlist', JSON.stringify(entry));
    }
}
