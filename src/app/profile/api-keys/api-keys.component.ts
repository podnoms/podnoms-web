import { Component, OnInit, Input } from '@angular/core';
import { Profile, ApiKeyRequestModel } from 'app/core';
import { ProfileDataService } from '../profile-data.service';
import { NGXLogger } from 'ngx-logger';

@Component({
    selector: 'app-api-keys',
    templateUrl: './api-keys.component.html',
    styleUrls: ['./api-keys.component.scss'],
})
export class ApiKeysComponent implements OnInit {
    @Input()
    user: Profile;

    keys: ApiKeyRequestModel[] = [];

    constructor(
        private profileDataService: ProfileDataService,
        protected logger: NGXLogger
    ) {}

    ngOnInit(): void {}

    requestNewKey() {
        const model = new ApiKeyRequestModel('Argle Bargle');
        this.profileDataService.requestNewKey(model).subscribe((r) => {
            this.logger.debug('api-keys.component', 'requestNewKey', r);
            this.keys.push(r);
        });
    }
}
