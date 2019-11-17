import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Podcast } from '../core';

@Injectable()
export class PodcastStoreService extends EntityCollectionServiceBase<Podcast> {
    constructor(entityCollectionServiceFactory: EntityCollectionServiceElementsFactory) {
        super('Podcast', entityCollectionServiceFactory);
    }
}
