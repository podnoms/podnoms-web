import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoilerplateComponent } from './boilerplate.component';

describe('BoilerplateComponent', () => {
  let component: BoilerplateComponent;
  let fixture: ComponentFixture<BoilerplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoilerplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoilerplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
