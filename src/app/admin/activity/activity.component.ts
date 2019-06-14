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
    loading: boolean = true;
    users: any;
    constructor(private http: HttpClient) {
        http.get<any>(
            `${environment.apiHost}/admin/user/activity?currentPage=1&pageSize=10`
        ).subscribe(r => {
            this.users = r.queryable;
            this.loading = false;
        });
    }
    ngOnInit() {}

    toggleExpandRow(row) {
        this.table.rowDetail.toggleExpandRow(row);
    }
    onSort($event) {
        this.loading = true;
        console.log('activity.component', 'onSort', $event);
        const field = $event.sorts[0].prop;
        const ascending = $event.sorts[0].dir === 'asc';
        //
        this.http
            .get<any>(
                `${environment.apiHost}/admin/user/activity?currentPage=1&pageSize=10&sortBy=${field}&ascending=${ascending}`
            )
            .subscribe(r => {
                this.users = r.queryable;
                this.loading = false;
            });
    }
}
