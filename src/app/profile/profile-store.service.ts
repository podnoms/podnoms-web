import { Injectable } from '@angular/core';
import { Profile } from '../core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { NGXLogger } from 'ngx-logger';

@Injectable({
    providedIn: 'root'
})
export class ProfileStoreService extends EntityCollectionServiceBase<Profile> {
    constructor(
        entityCollectionServiceFactory: EntityCollectionServiceElementsFactory,
        private logger: NGXLogger
    ) {
        super('Profile', entityCollectionServiceFactory);
    }
    checkSlug(slug: any): any {
        this.logger.info('profile-store.service', 'checkSlug', slug);
    }
}
