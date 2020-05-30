import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileDataService } from 'app/profile/profile-data.service';

@Component({
    selector: 'app-opml',
    templateUrl: './opml.component.html',
    styleUrls: ['./opml.component.scss'],
})
export class OpmlComponent implements OnInit {
    opml$: Observable<string>;
    constructor(private profileDataService: ProfileDataService) {}

    ngOnInit(): void {
        this.opml$ = this.profileDataService.getOpml();
    }
}
