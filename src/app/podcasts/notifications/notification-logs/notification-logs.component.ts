import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  Notification,
  NotificationLog,
} from '../../../core/model/notification';
import { NotificationDataService } from '../services/notification-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification-logs',
  templateUrl: './notification-logs.component.html',
  styleUrls: ['./notification-logs.component.scss'],
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
    this.notificationService.getLogs(this.notification.id).subscribe((l) => {
      this.logs = l;
      this.chRef.detectChanges();
    });
  }
}
