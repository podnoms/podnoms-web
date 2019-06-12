import { Injectable } from '@angular/core';
import { Profile } from '../core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from '@ngrx/data';

@Injectable({
    providedIn: 'root'
})
export class ProfileStoreService extends EntityCollectionServiceBase<Profile> {
    constructor(entityCollectionServiceFactory: EntityCollectionServiceElementsFactory) {
        super('Profile', entityCollectionServiceFactory);
    }
    checkSlug(slug: any): any {
        console.log('profile-store.service', 'checkSlug', slug);
    }
}
