import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastUploadFormComponent } from './podcast-upload-form.component';

describe('PodcastUploadFormComponent', () => {
  let component: PodcastUploadFormComponent;
  let fixture: ComponentFixture<PodcastUploadFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodcastUploadFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
