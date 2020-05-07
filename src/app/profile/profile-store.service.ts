import { Injectable } from '@angular/core';
import { Profile } from '../core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { NgxFancyLoggerService } from 'ngx-fancy-logger';

@Injectable({
    providedIn: 'root'
})
export class ProfileStoreService extends EntityCollectionServiceBase<Profile> {
    constructor(
        entityCollectionServiceFactory: EntityCollectionServiceElementsFactory,
        private logger: NgxFancyLoggerService
    ) {
        super('Profile', entityCollectionServiceFactory);
    }
    checkSlug(slug: any): any {
        this.logger.debug('profile-store.service', 'checkSlug', slug);
    }
}
