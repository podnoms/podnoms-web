import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { PodcastEntry } from '../core';

@Injectable({
    providedIn: 'root'
})
export class EntriesStoreService extends EntityCollectionServiceBase<PodcastEntry> {
    constructor(entityCollectionServiceFactory: EntityCollectionServiceElementsFactory) {
        super('Entry', entityCollectionServiceFactory);
    }
}
