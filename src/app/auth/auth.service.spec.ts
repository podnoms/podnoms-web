import { TestBed, inject } from '@angular/core/testing';

import { PodNomsAuthService } from './auth.service';

describe('AuthServiceService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PodNomsAuthService]
        });
    });

    it(
        'should be created',
        inject([PodNomsAuthService], (service: PodNomsAuthService) => {
            expect(service).toBeTruthy();
        })
    );
});
