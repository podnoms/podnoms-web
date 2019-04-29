import { TestBed, inject } from '@angular/core/testing';

import { NotificationDataService } from './notification-data.service';

describe('NotificationsDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationDataService]
    });
  });

  it('should be created', inject([NotificationDataService], (service: NotificationDataService) => {
    expect(service).toBeTruthy();
  }));
});
