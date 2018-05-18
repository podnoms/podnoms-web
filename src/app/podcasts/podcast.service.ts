import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceFactory
} from 'ngrx-data';
import { Podcast } from '../core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PodcastService extends EntityCollectionServiceBase<Podcast> {
    constructor(
        entityCollectionServiceFactory: EntityCollectionServiceFactory
    ) {
        super('Podcast', entityCollectionServiceFactory);
    }
}
