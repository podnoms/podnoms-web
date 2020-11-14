import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotificationLogsComponent } from './notification-logs.component';

describe('NotificationLogsComponent', () => {
  let component: NotificationLogsComponent;
  let fixture: ComponentFixture<NotificationLogsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
