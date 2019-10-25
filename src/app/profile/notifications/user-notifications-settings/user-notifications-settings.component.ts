import { ProfileDataService } from './../../profile-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { Profile } from 'app/core';
import { NotificationTypes } from './notification-types.enum';

@Component({
    selector: 'app-user-notifications-settings',
    templateUrl: './user-notifications-settings.component.html',
    styleUrls: ['./user-notifications-settings.component.scss']
})
export class UserNotificationsSettingsComponent implements OnInit {
    notificationTypes = NotificationTypes;
    @Input() user: Profile;
    constructor(public profileService: ProfileDataService) {}

    ngOnInit() {}
    isEnabled(type: NotificationTypes): Boolean {
        return (this.user.emailNotificationOptions & type) !== 0;
    }
    updateOption(__ts__event__, type: NotificationTypes) {
        if (__ts__event__.target.checked) {
            this.user.emailNotificationOptions =
                this.user.emailNotificationOptions | type;
        } else {
            this.user.emailNotificationOptions =
                this.user.emailNotificationOptions & ~type;
        }
        console.log(
            'user-notifications-settings.component',
            'updateOption',
            this.user.emailNotificationOptions
        );
        this.profileService
            .updateProfile(this.user)
            .subscribe(r =>
                console.log(
                    'user-notifications-settings.component',
                    'updateProfile',
                    r
                )
            );
    }
}
