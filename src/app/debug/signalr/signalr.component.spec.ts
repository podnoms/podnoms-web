import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalRComponent } from './signalr.component';

describe('SignalrComponent', () => {
    let component: SignalRComponent;
    let fixture: ComponentFixture<SignalRComponent>;

    beforeEach(async(() => {
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
