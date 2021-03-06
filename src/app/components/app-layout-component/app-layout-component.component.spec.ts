import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppLayoutComponentComponent } from './app-layout-component.component';

describe('AppLayoutComponentComponent', () => {
  let component: AppLayoutComponentComponent;
  let fixture: ComponentFixture<AppLayoutComponentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLayoutComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLayoutComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
