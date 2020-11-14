import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UploadDropboxComponent } from './upload-dropbox.component';

describe('UploadDropboxComponent', () => {
  let component: UploadDropboxComponent;
  let fixture: ComponentFixture<UploadDropboxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDropboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDropboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
