import { TestBed } from '@angular/core/testing';

import { UrlProcessorService } from './url-processor.service';

describe('UrlProcessorService', () => {
  let service: UrlProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
