import { TestBed, inject } from '@angular/core/testing';

import { ProfileDataService } from './profile-data.service';

describe('ProfileService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ProfileDataService]
        });
    });

    it(
        'should be created',
        inject([ProfileDataService], (service: ProfileDataService) => {
            expect(service).toBeTruthy();
        })
    );
});
