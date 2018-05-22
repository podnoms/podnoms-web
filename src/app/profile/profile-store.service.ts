import { Injectable } from '@angular/core';
import { Profile } from '../core';
import { EntityCollectionServiceBase, EntityCollectionServiceFactory } from 'ngrx-data';

@Injectable({
    providedIn: 'root'
})
export class ProfileStoreService extends EntityCollectionServiceBase<Profile> {
    constructor(entityCollectionServiceFactory: EntityCollectionServiceFactory) {
        super('Profile', entityCollectionServiceFactory);
    }
    checkSlug(slug: any): any {
        console.log('profile-store.service', 'checkSlug', slug);
    }
}
