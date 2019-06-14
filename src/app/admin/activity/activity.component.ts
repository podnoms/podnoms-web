import { Component, OnInit, ViewChild } from '@angular/core';
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
    @ViewChild('userTable', { static: false }) table: any;
    users$: Observable<any>;
    constructor(private http: HttpClient) {
        this.users$ = http.get<any>(`${environment.apiHost}/admin/user`);
    }
    ngOnInit() {}

    toggleExpandRow(row) {
        this.table.rowDetail.toggleExpandRow(row);
    }
}
