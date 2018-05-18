import { Injectable } from '@angular/core';
import { Profile } from '../core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceFactory
} from 'ngrx-data';

@Injectable({
    providedIn: 'root'
})
export class ProfileService extends EntityCollectionServiceBase<Profile> {
    constructor(
        entityCollectionServiceFactory: EntityCollectionServiceFactory
    ) {
        super('Profile', entityCollectionServiceFactory);
    }
}
