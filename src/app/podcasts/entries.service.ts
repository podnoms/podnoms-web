import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceFactory
} from 'ngrx-data';
import { PodcastEntry } from '../core';

@Injectable({
    providedIn: 'root'
})
export class EntriesService extends EntityCollectionServiceBase<PodcastEntry> {
    constructor(
        entityCollectionServiceFactory: EntityCollectionServiceFactory
    ) {
        super('Entry', entityCollectionServiceFactory);
    }
}
