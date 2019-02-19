import { TestBed, inject } from '@angular/core/testing';

import { NotificationStoreService } from './notification-store.service';

describe('NotificationsStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationStoreService]
    });
  });

  it('should be created', inject([NotificationStoreService], (service: NotificationStoreService) => {
    expect(service).toBeTruthy();
  }));
});
