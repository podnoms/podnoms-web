import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastAddFormComponent } from './podcast-add-form.component';

describe('PodcastAddFormComponent', () => {
  let component: PodcastAddFormComponent;
  let fixture: ComponentFixture<PodcastAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodcastAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
