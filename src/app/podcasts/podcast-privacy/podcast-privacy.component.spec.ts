import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastPrivacyComponent } from './podcast-privacy.component';

describe('PodcastPrivacyComponent', () => {
  let component: PodcastPrivacyComponent;
  let fixture: ComponentFixture<PodcastPrivacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodcastPrivacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
