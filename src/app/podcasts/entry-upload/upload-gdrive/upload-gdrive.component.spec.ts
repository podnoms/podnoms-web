import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UploadGdriveComponent } from './upload-gdrive.component';

describe('UploadGdriveComponent', () => {
  let component: UploadGdriveComponent;
  let fixture: ComponentFixture<UploadGdriveComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadGdriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadGdriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
