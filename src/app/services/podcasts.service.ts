import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {PodcastEntryModel, PodcastModel} from '../models/podcasts.models';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class PodcastsService {

    constructor(private _http: AuthHttp) {

    }

    getPodcasts(): Observable<PodcastModel[]> {
        return this._http.get('api/podcast')
            .map(res => res.json());
    }

    getPodcast(slug: string): Observable<PodcastModel> {
        return this._http.get('api/podcast/' + slug)
            .map(res => res.json());
    }

    getPodcastEntries(podcastId: number): Observable<PodcastEntryModel> {
        return this._http.get('api/entry/all/' + podcastId)
            .map(res => res.json());
    }

    getPodcastEntry(slug: string): Observable<PodcastEntryModel> {
        return this._http.get('api/entry/' + slug)
            .map(res => res.json());
    }

    getQueued(): Observable<PodcastEntryModel[]> {
        return this._http.get('api/entry/queued')
            .map(res => res.json());
    }

    getWaiting(): Observable<PodcastEntryModel[]> {
        return this._http.get('api/entry/waiting')
            .map(res => res.json());
    }

    getAccepted(): Observable<PodcastEntryModel[]> {
        return this._http.get('api/entry/accepted')
            .map(res => res.json());
    }

    addPodcast(podcast: PodcastModel): Observable<PodcastModel> {
        console.log('PodcastsService', 'addPodcast', podcast);
        return this._http.post('api/podcast', JSON.stringify(podcast))
            .map(res => {
                return res.json();
            });
    }

    updatePodcast(podcast: PodcastModel): Observable<PodcastModel> {
        console.log('PodcastsService', 'updatePodcast', podcast);
        return this._http.post('api/podcast', podcast)
            .map(res => res.json());
    }

    updatePodcastImage(podcastId: number, image: string): Observable<string> {
        return this._http.post('api/podcast/updateimage', image)
            .map(res => res.text());
    }

    addPodcastEntry(entry: PodcastEntryModel): Observable<PodcastEntryModel> {
        console.log('PodcastsService: addPodcastEntry', entry);
        return this._http.post('api/entry', JSON.stringify(entry))
            .map(res => res.json());
    }

    removePodcast(id: number) {
        console.log('PodcastsService: removePodcast', id);
        return this._http.delete('api/podcast/' + id);
    }

    removePodcastEntry(id: number) {
        console.log('PodcastsService: removePodcastEntry', id);
        return this._http.delete('api/entry/' + id);
    }

    resendPodastEntryRequest(entry: PodcastEntryModel): Observable<PodcastEntryModel[]> {
        console.log('PodcastsService: removePodcastEntry', entry);
        return this._http.post('api/entry/resend/', entry)
            .map(res => res.json());
    }

    getPodcastRssUrl(slug: string) {
        return this._http.get('api/podcast/rssurl/' + slug)
            .map(res => res.json());
    }
}
