import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadUrlComponent } from './upload-url.component';

describe('UploadUrlComponent', () => {
    let component: UploadUrlComponent;
    let fixture: ComponentFixture<UploadUrlComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UploadUrlComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadUrlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
