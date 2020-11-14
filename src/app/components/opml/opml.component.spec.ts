import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OpmlComponent } from './opml.component';

describe('OpmlComponent', () => {
  let component: OpmlComponent;
  let fixture: ComponentFixture<OpmlComponent>;

  beforeEach(waitForAsync(() => {
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
