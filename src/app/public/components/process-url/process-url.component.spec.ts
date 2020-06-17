import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessUrlComponent } from './process-url.component';

describe('ProcessUrlComponent', () => {
  let component: ProcessUrlComponent;
  let fixture: ComponentFixture<ProcessUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
