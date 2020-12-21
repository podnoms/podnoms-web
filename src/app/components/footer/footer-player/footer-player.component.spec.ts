import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FooterPlayerComponent } from './footer-player.component';

describe('FooterPlayerComponent', () => {
    let component: FooterPlayerComponent;
    let fixture: ComponentFixture<FooterPlayerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [FooterPlayerComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FooterPlayerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
