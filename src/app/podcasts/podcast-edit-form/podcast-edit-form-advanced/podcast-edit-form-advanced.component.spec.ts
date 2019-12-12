import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastEditFormAdvancedComponent } from './podcast-edit-form-advanced.component';

describe('PodcastEditFormAdvancedComponent', () => {
  let component: PodcastEditFormAdvancedComponent;
  let fixture: ComponentFixture<PodcastEditFormAdvancedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodcastEditFormAdvancedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastEditFormAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
