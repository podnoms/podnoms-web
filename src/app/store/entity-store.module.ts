import { NgModule } from '@angular/core';
import {
    EntityMetadataMap,
    DefaultDataServiceConfig,
    EntityDataService,
    EntityDataModule,
} from '@ngrx/data';
import { environment } from '../../environments/environment';
import { PodcastDataService } from '../podcasts/podcast-data.service';
import { EntryDataService } from '../podcasts/entry-data.service';
import { ProfileDataService } from 'app/profile/profile-data.service';

export function sortByName(a: { name: string }, b: { name: string }): number {
    return a.name.localeCompare(b.name);
}

export const entityMetadata: EntityMetadataMap = {
    Podcast: {},
    Entry: {
        // sortComparer: (a: { name: string }, b: { name: string }): number => {
        //     var d1 = new Date(a.createDate);
        //     var d2 = new Date(d1);
        // }
    },
    Profile: {},
    Notification: {},
};
const defaultDataServiceConfig: DefaultDataServiceConfig = {
    root: environment.apiHost,
    entityHttpResourceUrls: {
        Podcast: {
            // You must specify the root as part of the resource URL.
            entityResourceUrl: environment.apiHost + '/podcast/',
            collectionResourceUrl: environment.apiHost + '/podcast/',
        },
        Entry: {
            // You must specify the root as part of the resource URL.
            entityResourceUrl: environment.apiHost + '/entry/',
            collectionResourceUrl: environment.apiHost + '/entry/',
        },
        Profile: {
            entityResourceUrl: environment.apiHost + '/profile/',
            collectionResourceUrl: environment.apiHost + '/profile/',
        },
        Notification: {
            entityResourceUrl: environment.apiHost + '/notification/',
            collectionResourceUrl: environment.apiHost + '/notification/',
        },
    },
};
export const pluralNames = {};

@NgModule({
    imports: [
        EntityDataModule.forRoot({
            entityMetadata: entityMetadata,
            pluralNames: pluralNames,
        }),
    ],
    providers: [
        {
            provide: DefaultDataServiceConfig,
            useValue: defaultDataServiceConfig,
        },
    ],
})
export class EntityStoreModule {
    constructor(
        entityDataService: EntityDataService,
        podcastDataService: PodcastDataService,
        podcastEntryDataService: EntryDataService,
        profileDataService: ProfileDataService
    ) {
        entityDataService.registerService('Podcast', podcastDataService);
        entityDataService.registerService('Entry', podcastEntryDataService);
        entityDataService.registerService('Profile', profileDataService);
    }
}
