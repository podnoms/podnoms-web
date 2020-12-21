import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { AuthGuard } from './auth-guard.guard';

describe('AuthGuardGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthGuard]
        });
    });

    it(
        'should ...',
        inject([AuthGuard], (guard: AuthGuard) => {
            expect(guard).toBeTruthy();
        })
    );
});
