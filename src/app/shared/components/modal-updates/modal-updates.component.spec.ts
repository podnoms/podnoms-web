import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdatesComponent } from './modal-updates.component';

describe('ModalUpdatesComponent', () => {
    let component: ModalUpdatesComponent;
    let fixture: ComponentFixture<ModalUpdatesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalUpdatesComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalUpdatesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
