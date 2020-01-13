import { TestBed } from '@angular/core/testing';
import { EntryDataService } from './entry-data.service';


describe('EntryDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
      const service: EntryDataService = TestBed.get(EntryDataService);
    expect(service).toBeTruthy();
  });
});
