import { TestBed, inject } from '@angular/core/testing';

import { PodnomsAuthService } from './podnoms-auth.service';

describe('PodnomsAuthService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PodnomsAuthService]
        });
    });

    it(
        'should be created',
        inject([PodnomsAuthService], (service: PodnomsAuthService) => {
            expect(service).toBeTruthy();
        })
    );
});
