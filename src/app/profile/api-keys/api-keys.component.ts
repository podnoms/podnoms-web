import { Component, OnInit, Input } from '@angular/core';
import { Profile, ApiKeyRequestModel } from 'app/core';
import { ProfileDataService } from '../profile-data.service';
import { NGXLogger } from 'ngx-logger';
import { Observable, timer } from 'rxjs';

@Component({
    selector: 'app-api-keys',
    templateUrl: './api-keys.component.html',
    styleUrls: ['./api-keys.component.scss'],
})
export class ApiKeysComponent implements OnInit {
    @Input()
    user: Profile;

    keys: ApiKeyRequestModel[];

    constructor(
        private profileDataService: ProfileDataService,
        protected logger: NGXLogger
    ) {}

    ngOnInit(): void {
        this.profileDataService.getKeys().subscribe((k) => (this.keys = k));
    }
    requestNewKey(keyName: string) {
        const model = new ApiKeyRequestModel(keyName);
        this.profileDataService.requestNewKey(model).subscribe((r) => {
            this.keys.unshift(r);
            // this.profileDataService.getKeys().subscribe((k) => (this.keys = k));
        });
    }
}
