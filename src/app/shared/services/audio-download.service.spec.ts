import { TestBed } from '@angular/core/testing';

import { AudioDownloadService } from './audio-download.service';

describe('AudioDownloadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AudioDownloadService = TestBed.get(AudioDownloadService);
    expect(service).toBeTruthy();
  });
});
