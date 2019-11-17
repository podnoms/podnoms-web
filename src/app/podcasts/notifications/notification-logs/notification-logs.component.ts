import {
    Component,
    OnInit,
    Input,
    AfterViewInit,
    ChangeDetectorRef
} from '@angular/core';
import {
    Notification,
    NotificationLog
} from '../../../core/model/notification';
import { NotificationDataService } from '../services/notification-data.service';
import { Observable } from 'rxjs';

import * as $ from 'jquery';

@Component({
    selector: 'app-notification-logs',
    templateUrl: './notification-logs.component.html',
    styleUrls: ['./notification-logs.component.scss']
})
export class NotificationLogsComponent implements AfterViewInit {
    @Input()
    notification: Notification;
    logs: NotificationLog[];

    dataTable: any;

    constructor(
        private notificationService: NotificationDataService,
        private chRef: ChangeDetectorRef
    ) {}

    ngAfterViewInit() {
        this.notificationService.getLogs(this.notification.id).subscribe(l => {
            this.logs = l;
            // datatables does not work unless the data are rendered
            this.chRef.detectChanges();

            // const table: any = $('table');
            // this.dataTable = table.DataTable({
            //     pageLength: 5,
            //     aLengthMenu: [5, 10, 25, 50]
            // });
        });
    }
}
