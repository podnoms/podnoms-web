import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserNotificationsSettingsComponent } from './user-notifications-settings.component';

describe('UserNotificationsSettingsComponent', () => {
  let component: UserNotificationsSettingsComponent;
  let fixture: ComponentFixture<UserNotificationsSettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserNotificationsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNotificationsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
