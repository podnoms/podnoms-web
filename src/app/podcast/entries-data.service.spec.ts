import { TestBed, inject } from '@angular/core/testing';

import { EntriesDataService } from './entries-data.service';

describe('EntriesDataService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EntriesDataService]
        });
    });

    it(
        'should be created',
        inject([EntriesDataService], (service: EntriesDataService) => {
            expect(service).toBeTruthy();
        })
    );
});
