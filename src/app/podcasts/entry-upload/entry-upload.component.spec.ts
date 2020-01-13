import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryUploadComponent } from './entry-upload.component';

describe('EntryUploadComponent', () => {
    let component: EntryUploadComponent;
    let fixture: ComponentFixture<EntryUploadComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EntryUploadComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EntryUploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
