import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ApiKeysComponent } from './api-keys.component';

describe('ApiKeysComponent', () => {
  let component: ApiKeysComponent;
  let fixture: ComponentFixture<ApiKeysComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiKeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
