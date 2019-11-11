import {
    Component,
    Input,
    AfterViewInit,
    EventEmitter
} from '@angular/core';
import { PodcastEntry } from 'app/core';
import { LogService } from 'app/shared/services/log.service';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-entry-logs',
    templateUrl: './entry-logs.component.html',
    styleUrls: ['./entry-logs.component.scss']
})
export class EntryLogsComponent implements AfterViewInit {
    @Input() entry: PodcastEntry;
    @Input() onClose: EventEmitter<any>;
    constructor(public modal: NgbActiveModal, private logService: LogService) {}
    logs$: Observable<any>;

    ngAfterViewInit(): void {
        this.logs$ = this.logService.getLogsForEntry(this.entry.id);
    }
    doClose() {
        this.onClose.emit();
    }
}
