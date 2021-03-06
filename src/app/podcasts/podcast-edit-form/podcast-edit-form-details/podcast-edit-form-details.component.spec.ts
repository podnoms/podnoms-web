import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PodcastEditFormDetailsComponent } from './podcast-edit-form-details.component';

describe('PodcastEditFormDetailsComponent', () => {
  let component: PodcastEditFormDetailsComponent;
  let fixture: ComponentFixture<PodcastEditFormDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PodcastEditFormDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastEditFormDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
