import { Component, Input } from '@angular/core';
import { Profile } from 'app/core';
import { NGXLogger } from 'ngx-logger';
import { ProfileDataService } from './../../profile-data.service';
import { NotificationTypes } from './notification-types.enum';

@Component({
    selector: 'app-user-notifications-settings',
    templateUrl: './user-notifications-settings.component.html',
    styleUrls: ['./user-notifications-settings.component.scss'],
})
export class UserNotificationsSettingsComponent {
    notificationTypes = NotificationTypes;
    @Input() user: Profile;
    constructor(
        public logger: NGXLogger,
        public profileService: ProfileDataService
    ) {}

    isEnabled(type: NotificationTypes): Boolean {
        return (this.user.emailNotificationOptions & type) !== 0;
    }
    updateOption($event: any, type: NotificationTypes) {
        if ($event.target.checked) {
            this.user.emailNotificationOptions =
                this.user.emailNotificationOptions | type;
        } else {
            this.user.emailNotificationOptions =
                this.user.emailNotificationOptions & ~type;
        }
        this.logger.debug(
            'user-notifications-settings.component',
            'updateOption',
            this.user.emailNotificationOptions
        );
        this.profileService
            .updateProfile(this.user)
            .subscribe((r) =>
                this.logger.debug(
                    'user-notifications-settings.component',
                    'updateProfile',
                    r
                )
            );
    }
}
