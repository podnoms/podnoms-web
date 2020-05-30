import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpmlPageComponent } from './opml-page.component';

describe('OpmlPageComponent', () => {
  let component: OpmlPageComponent;
  let fixture: ComponentFixture<OpmlPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpmlPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpmlPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
