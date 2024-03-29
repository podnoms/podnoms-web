import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Podcast } from '../core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, switchAll } from 'rxjs/operators';
import { DefaultDataService, QueryParams, HttpUrlGenerator } from '@ngrx/data';
import { NGXLogger } from 'ngx-logger';

@Injectable({
    providedIn: 'root',
})
@Injectable()
export class PodcastDataService extends DefaultDataService<Podcast> {
    static _replacer(key, value) {
        if (key === 'imageUrl') {
            return undefined;
        }
        return value;
    }
    constructor(
        http: HttpClient,
        public logger: NGXLogger,
        httpUrlGenerator: HttpUrlGenerator
    ) {
        super('Podcast', http, httpUrlGenerator);
    }
    //#region Podcasts

    // TODO: these below inject into the entity store!
    getAll(): Observable<Podcast[]> {
        return super
            .getAll()
            .pipe(
                map((podcasts) =>
                    podcasts.map((podcast) => this.__mapPodcast(podcast))
                )
            );
    }

    override getById(id: string | number): Observable<Podcast> {
        return super.getById(id); // .pipe(map(hero => this.mapHero(hero)));
    }

    override getWithQuery(params: string | QueryParams): Observable<Podcast[]> {
        return super.getWithQuery(params); // .pipe(map(heroes => heroes.map(hero => this.mapHero(hero))));
    }

    private __mapPodcast(podcast: Podcast) {
        return {
            ...podcast,
            podcastEntries: podcast.podcastEntries.sort(
                (a, b) =>
                    new Date(b.createDate).getTime() -
                    new Date(a.createDate).getTime()
            ),
        };
    }
    // END TODO (but a lot of the below is now unecessary)
    getActivePodcast(): Observable<string> {
        return this.http.get<string>(`${environment.apiHost}/podcast/active`);
    }
    addPodcast(podcast: Podcast): Observable<Podcast> {
        this.logger.debug('PodcastService', 'addPodcast', podcast);
        return this.http.post<Podcast>(
            environment.apiHost + '/podcast',
            podcast
        );
    }
    updatePodcast(podcast: Podcast): Observable<Podcast> {
        if (!podcast.category) {
            delete podcast['category'];
        }

        return this.http.put<Podcast>(
            environment.apiHost + '/podcast/',
            podcast
        );
    }
    deletePodcast(id: string): Observable<boolean> {
        return this.http
            .delete<Response>(environment.apiHost + '/podcast/' + id)
            .pipe(map((r) => true));
    }
    checkSlug(slug): Observable<string> {
        this.logger.debug('profile.service.ts', 'checkSlug', slug);
        return this.http.get<string>(
            environment.apiHost + '/podcast/checkslug/' + slug
        );
    }
}
