import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Podcast, PodcastEntry } from '../core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { DefaultDataService, QueryParams, HttpUrlGenerator, Logger } from 'ngrx-data';

@Injectable({
    providedIn: 'root'
})
@Injectable()
export class PodcastDataService extends DefaultDataService<Podcast> {
    static _replacer(key, value) {
        if (key === 'imageUrl') {
            return undefined;
        }
        return value;
    }
    constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
        super('Podcast', http, httpUrlGenerator);
    }
    //#region Podcasts

    // TODO: these below inject into the entity store!
    getAll(): Observable<Podcast[]> {
        return super
            .getAll()
            .pipe(map(podcasts => podcasts.map(podcast => this.__mapPodcast(podcast))));
    }

    getById(id: string | number): Observable<Podcast> {
        return super.getById(id); // .pipe(map(hero => this.mapHero(hero)));
    }

    getWithQuery(params: string | QueryParams): Observable<Podcast[]> {
        return super.getWithQuery(params); // .pipe(map(heroes => heroes.map(hero => this.mapHero(hero))));
    }

    private __mapPodcast(podcast: Podcast) {
        return {
            ...podcast,
            podcastEntries: podcast.podcastEntries.sort(
                (a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
            )
        };
    }
    // END TODO (but a lot of the below is now unecessary)

    addPodcast(podcast: Podcast): Observable<Podcast> {
        console.log('PodcastService', 'addPodcast', podcast);
        // Remove this as the client is choosing the random image now
        // const data = JSON.stringify(podcast, PodcastDataService._replacer);
        return this.http.post<Podcast>(environment.apiHost + '/podcast', podcast);
    }
    updatePodcast(podcast: Podcast): Observable<Podcast> {
        if (!podcast.category) {
            delete podcast['category'];
        }

        return this.http.put<Podcast>(environment.apiHost + '/podcast/', podcast);
    }
    deletePodcast(id: string): Observable<boolean> {
        return this.http
            .delete<Response>(environment.apiHost + '/podcast/' + id)
            .pipe(map(r => true));
    }
    checkSlug(slug): Observable<string> {
        console.log('profile.service.ts', 'checkSlug', slug);
        return this.http.get<string>(environment.apiHost + '/podcast/checkslug/' + slug);
    }

    //#endregion
    //#region Entries

    getAllEntriesForUser(): Observable<PodcastEntry[]> {
        return this.http.get<PodcastEntry[]>(environment.apiHost + '/entry/users/');
    }
    getEntries(slug: string): Observable<PodcastEntry[]> {
        return this.http.get<PodcastEntry[]>(environment.apiHost + '/entry/all/' + slug);
    }
    addEntry(entry: PodcastEntry): Observable<PodcastEntry> {
        return this.http.post<PodcastEntry>(
            environment.apiHost + '/entry',
            JSON.stringify(entry)
        );
    }
    updateEntry(entry: PodcastEntry) {
        return this.http.post<PodcastEntry>(
            environment.apiHost + '/entry',
            JSON.stringify(entry)
        );
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
        return this.http.post<PodcastEntry>(
            environment.apiHost + '/playlist',
            JSON.stringify(entry)
        );
    }
    //#endregion
}
