import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PasswordCheckerComponent } from './password-checker.component';

describe('PasswordCheckerComponent', () => {
    let component: PasswordCheckerComponent;
    let fixture: ComponentFixture<PasswordCheckerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [PasswordCheckerComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordCheckerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
