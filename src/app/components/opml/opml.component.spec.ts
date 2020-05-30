import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpmlComponent } from './opml.component';

describe('OpmlComponent', () => {
  let component: OpmlComponent;
  let fixture: ComponentFixture<OpmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
