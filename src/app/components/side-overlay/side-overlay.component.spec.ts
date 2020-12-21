import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SideOverlayComponent } from './side-overlay.component';

describe('SideOverlayComponent', () => {
    let component: SideOverlayComponent;
    let fixture: ComponentFixture<SideOverlayComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SideOverlayComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SideOverlayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
