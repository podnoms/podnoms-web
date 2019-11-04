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
    sortIsAscending: boolean = false;
    sortField: string = 'LastSeen';
    page: any = {
        rowCount: 0,
        currentPage: 1,
        pageSize: 10
    };
    users: any;
    constructor(private http: HttpClient) {
        this._loadActivityData();
    }
    ngOnInit() {}

    toggleExpandRow(row) {
        this.table.rowDetail.toggleExpandRow(row);
    }
    setPage(__ts__event__) {
        this.page.currentPage = __ts__event__.offset + 1;
        this._loadActivityData();
    }
    onSort(__ts__event__) {
        this.loading = true;
        this.sortField = __ts__event__.sorts[0].prop;
        this.sortIsAscending = __ts__event__.sorts[0].dir === 'asc';
        this._loadActivityData();
    }
    _loadActivityData() {
        this.http
            .get<any>(
                `${environment.apiHost}/admin/user/activity?currentPage=${this.page.currentPage}` +
                    `&pageSize=10&sortBy=${this.sortField}&ascending=${this.sortIsAscending}`
            )
            .subscribe(r => {
                this.users = r.results;
                this.page = r;
                this.loading = false;
            });
    }
    getClassName(countryCode: string) {
        if (countryCode) {
            return `flag-icon flag-icon-${countryCode.toLowerCase()}`;
        }
        return 'd-none';
    }
}
