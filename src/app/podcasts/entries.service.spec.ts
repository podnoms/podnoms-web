import { TestBed, inject } from '@angular/core/testing';

import { EntriesStoreService } from './entries-store.service';

describe('EntriesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [EntriesStoreService]
        });
    });

    it(
        'should be created',
        inject([EntriesStoreService], (service: EntriesStoreService) => {
            expect(service).toBeTruthy();
        })
    );
});
