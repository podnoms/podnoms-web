import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceFactory } from 'ngrx-data';
import { Podcast } from '../core';

@Injectable()
export class PodcastStoreService extends EntityCollectionServiceBase<Podcast> {
    constructor(entityCollectionServiceFactory: EntityCollectionServiceFactory) {
        super('Podcast', entityCollectionServiceFactory);
    }
}
