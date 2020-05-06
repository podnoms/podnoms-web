import { TestBed } from '@angular/core/testing';

import { BoilerplateService } from './boilerplate.service';

describe('BoilerplateService', () => {
  let service: BoilerplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoilerplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
