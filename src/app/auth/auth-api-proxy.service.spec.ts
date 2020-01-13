import { TestBed, inject } from '@angular/core/testing';
import { AuthApiProxyService } from './auth-api-proxy.service';

describe('PodnomsAuthService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthApiProxyService]
        });
    });

    it(
        'should be created',
        inject([AuthApiProxyService], (service: AuthApiProxyService) => {
            expect(service).toBeTruthy();
        })
    );
});
