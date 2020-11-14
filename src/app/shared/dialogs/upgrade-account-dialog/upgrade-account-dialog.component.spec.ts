import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UpgradeAccountDialogComponent } from './upgrade-account-dialog.component';

describe('UpgradeAccountDialogComponent', () => {
  let component: UpgradeAccountDialogComponent;
  let fixture: ComponentFixture<UpgradeAccountDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpgradeAccountDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
