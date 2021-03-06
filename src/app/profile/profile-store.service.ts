import { Injectable } from '@angular/core';
import { Profile } from '../core';
import {
    EntityActionOptions,
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ProfileStoreService extends EntityCollectionServiceBase<Profile> {
    constructor(
        entityCollectionServiceFactory: EntityCollectionServiceElementsFactory,
        private logger: NGXLogger
    ) {
        super('Profile', entityCollectionServiceFactory);
    }

    checkSlug(slug: any): any {
        this.logger.debug('profile-store.service', 'checkSlug', slug);
    }
}
