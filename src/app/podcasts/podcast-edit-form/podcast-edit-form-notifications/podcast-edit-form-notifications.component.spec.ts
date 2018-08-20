import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastEditFormNotificationsComponent } from './podcast-edit-form-notifications.component';

describe('PodcastEditFormNotificationsComponent', () => {
  let component: PodcastEditFormNotificationsComponent;
  let fixture: ComponentFixture<PodcastEditFormNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodcastEditFormNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastEditFormNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
