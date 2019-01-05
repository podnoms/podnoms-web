import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory, QueryParams } from 'ngrx-data';
import { PodcastEntry } from '../core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EntriesStoreService extends EntityCollectionServiceBase<PodcastEntry> {
    constructor(entityCollectionServiceFactory: EntityCollectionServiceElementsFactory) {
        super('Entry', entityCollectionServiceFactory);
    }
}
