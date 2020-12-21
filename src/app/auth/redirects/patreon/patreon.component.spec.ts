import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatreonComponent } from './patreon.component';

describe('PatreonComponent', () => {
  let component: PatreonComponent;
  let fixture: ComponentFixture<PatreonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatreonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatreonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
