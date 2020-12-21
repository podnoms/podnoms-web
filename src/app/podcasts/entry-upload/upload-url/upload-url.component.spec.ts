import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UploadUrlComponent } from './upload-url.component';

describe('UploadUrlComponent', () => {
    let component: UploadUrlComponent;
    let fixture: ComponentFixture<UploadUrlComponent>;

    beforeEach(waitForAsync(() => {
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
