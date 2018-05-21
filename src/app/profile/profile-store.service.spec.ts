import { TestBed, inject } from '@angular/core/testing';

import { ProfileStoreService } from './profile-store.service';

describe('ProfileStoreService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ProfileStoreService]
        });
    });

    it(
        'should be created',
        inject([ProfileStoreService], (service: ProfileStoreService) => {
            expect(service).toBeTruthy();
        })
    );
});
