import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotificationItemComponent } from './notification-item.component';

describe('NotificationsEditComponent', () => {
    let component: NotificationItemComponent;
    let fixture: ComponentFixture<NotificationItemComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NotificationItemComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
