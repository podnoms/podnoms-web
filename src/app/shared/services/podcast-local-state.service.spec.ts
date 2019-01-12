import { TestBed } from '@angular/core/testing';

import { PodcastLocalStateService } from './podcast-local-state.service';

describe('PodcastLocalStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PodcastLocalStateService = TestBed.get(PodcastLocalStateService);
    expect(service).toBeTruthy();
  });
});
