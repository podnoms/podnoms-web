import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceFactory } from 'ngrx-data';
import { Podcast } from '../core';
import { Observable, BehaviorSubject } from 'rxjs';
import { UUID } from 'angular2-uuid';

@Injectable()
export class PodcastStoreService extends EntityCollectionServiceBase<Podcast> {
    uid = UUID.UUID();

    constructor(entityCollectionServiceFactory: EntityCollectionServiceFactory) {
        super('Podcast', entityCollectionServiceFactory);
    }
}
