import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from 'ngrx-data';
import { Podcast } from '../core';
import { Observable } from 'rxjs';

@Injectable()
export class PodcastStoreService extends EntityCollectionServiceBase<Podcast> {
    constructor(entityCollectionServiceFactory: EntityCollectionServiceElementsFactory) {
        super('Podcast', entityCollectionServiceFactory);
    }
}
