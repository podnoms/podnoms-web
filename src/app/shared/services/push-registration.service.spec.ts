import { TestBed, inject } from '@angular/core/testing';

import { PushRegistrationService } from './push-registration.service';

describe('PushRegistrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PushRegistrationService]
    });
  });

  it('should be created', inject([PushRegistrationService], (service: PushRegistrationService) => {
    expect(service).toBeTruthy();
  }));
});
