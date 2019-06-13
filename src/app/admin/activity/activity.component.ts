import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Profile } from 'app/core';

@Component({
    selector: 'app-activity',
    templateUrl: './activity.component.html',
    styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
    users$: Observable<Profile>;
    constructor(private http: HttpClient) {
        this.users$ = http.get<Profile>(`${environment.apiHost}/admin/user`);
    }
    ngOnInit() {}
}
