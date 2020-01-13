import { Injectable } from '@angular/core';
import { LocalStorageService, NgxResource } from 'ngx-store';

@Injectable({
    providedIn: 'root'
})
export class PodcastLocalStateService {
    constructor(private localStorageService: LocalStorageService) {}

    public getPodcastState(podcastId: string): NgxResource<any> {
        return this.localStorageService.load(`lps__${podcastId}`).setDefaultValue({
            hasNewEpisodes: true
        });
    }
    public setPodcastState(podcastId: string, state: any) {
        this.localStorageService.set(`lps__${podcastId}`, state);
    }
}
