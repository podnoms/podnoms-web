import { NgModule } from '@angular/core';
import {
    EntityMetadataMap,
    NgrxDataModule,
    EntityDataService,
    EntityReducerFactory,
    DefaultDataServiceConfig
} from 'ngrx-data';
import { NgrxDataToastService } from './ngrx-data-toast.service';
import { environment } from '../../environments/environment';

export const entityMetadata: EntityMetadataMap = {
    Podcast: {},
    Entry: {},
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
            // You must specify the root as part of the resource URL.
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
        NgrxDataToastService,
        {
            provide: DefaultDataServiceConfig,
            useValue: defaultDataServiceConfig
        }
    ]
})
export class EntityStoreModule {
    constructor(toastService: NgrxDataToastService) {}
}
