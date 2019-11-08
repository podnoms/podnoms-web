import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { PodcastEntry } from 'app/core';
import { LogService } from 'app/shared/services/log.service';
import { Observable } from 'rxjs';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
    selector: 'app-entry-logs',
    templateUrl: './entry-logs.component.html',
    styleUrls: ['./entry-logs.component.scss']
})
export class EntryLogsComponent implements AfterViewInit {
    ColumnMode = ColumnMode;
    columns = [
        { name: 'PodcastEntry' },
        { name: 'ClientAddress' },
        { name: 'ExtraInfo' }
    ];

    @Input() entry: PodcastEntry;
    constructor(private logService: LogService) {}
    logs$: Observable<any>;

    ngAfterViewInit(): void {
        this.logs$ = this.logService.getLogsForEntry(this.entry.id);
    }
}
