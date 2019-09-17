import { TestBed } from '@angular/core/testing';

import { WaveformService } from './waveform.service';

describe('WaveformService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WaveformService = TestBed.get(WaveformService);
    expect(service).toBeTruthy();
  });
});
