import { NgModule } from '@angular/core';
import { EntityMetadataMap, NgrxDataModule, DefaultDataServiceConfig } from 'ngrx-data';
import { environment } from '../../environments/environment';

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
    Profile: {}
};
const defaultDataServiceConfig: DefaultDataServiceConfig = {
    root: environment.apiHost,
    entityHttpResourceUrls: {
        Podcast: {
            // You must specify the root as part of the resource URL.
            entityResourceUrl: environment.apiHost + '/podcast/',
            collectionResourceUrl: environment.apiHost + '/podcast/'
        },
        Entry: {
            // You must specify the root as part of the resource URL.
            entityResourceUrl: environment.apiHost + '/entry/',
            collectionResourceUrl: environment.apiHost + '/entry/'
        },
        Profile: {
            entityResourceUrl: environment.apiHost + '/profile/',
            collectionResourceUrl: environment.apiHost + '/profile/'
        }
    }
};
export const pluralNames = {};

@NgModule({
    imports: [
        NgrxDataModule.forRoot({
            entityMetadata: entityMetadata,
            pluralNames: pluralNames
        })
    ],
    providers: [
        {
            provide: DefaultDataServiceConfig,
            useValue: defaultDataServiceConfig
        }
    ]
})
export class EntityStoreModule {
    constructor() {}
}
