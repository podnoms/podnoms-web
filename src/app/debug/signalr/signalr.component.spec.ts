import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SignalRComponent } from './signalr.component';

describe('SignalrComponent', () => {
    let component: SignalRComponent;
    let fixture: ComponentFixture<SignalRComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SignalRComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignalRComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
