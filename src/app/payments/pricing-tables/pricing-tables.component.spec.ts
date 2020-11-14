import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PricingTablesComponent } from './pricing-tables.component';

describe('PricingTablesComponent', () => {
  let component: PricingTablesComponent;
  let fixture: ComponentFixture<PricingTablesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
