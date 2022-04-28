import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-activity',
    templateUrl: './activity.component.html',
    styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent {
    @ViewChild('userTable') table: any;
    loading: boolean = true;
    sortIsAscending: boolean = false;
    sortField: string = 'LastSeen';
    page: any = {
        rowCount: 0,
        currentPage: 1,
        pageSize: 10,
    };
    users: any;
    constructor(private http: HttpClient) {
        this._loadActivityData();
    }

    toggleExpandRow(row: any) {
        this.table.rowDetail.toggleExpandRow(row);
    }
    setPage($event: any) {
        this.page.currentPage = $event.offset + 1;
        this._loadActivityData();
    }
    onSort($event: any) {
        this.loading = true;
        this.sortField = $event.sorts[0].prop;
        this.sortIsAscending = $event.sorts[0].dir === 'asc';
        this._loadActivityData();
    }
    _loadActivityData() {
        this.http
            .get<any>(
                `${environment.apiHost}/admin/user/activity?currentPage=${this.page.currentPage}` +
                    `&pageSize=10&sortBy=${this.sortField}&ascending=${this.sortIsAscending}`
            )
            .subscribe((r) => {
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
