import { Injectable } from '@angular/core';
import {
    EntityCollectionServiceBase,
    EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Notification } from '../../../core/model/notification';

@Injectable({
    providedIn: 'root'
})
export class NotificationStoreService extends EntityCollectionServiceBase<Notification> {
    constructor(entityCollectionServiceFactory: EntityCollectionServiceElementsFactory) {
        super('Notification', entityCollectionServiceFactory);
    }
}
