import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Component({
    selector: 'app-remote-page-parser',
    templateUrl: './remote-page-parser.component.html',
    styleUrls: ['./remote-page-parser.component.scss'],
})
export class RemotePageParserComponent {
    @Input()
    remoteAudioData: any;

    selectedItem: string = '0';

    @Output()
    pageEntryChosen: EventEmitter<string> = new EventEmitter<string>();

    errorText = '';

    constructor(private logger: NGXLogger) {}

    itemChosen($event) {
        this.logger.debug(
            'remote-page-parser.component',
            'itemChosen',
            this.remoteAudioData.links[this.selectedItem].key
        );
        this.pageEntryChosen.emit(
            $event && this.remoteAudioData.links[this.selectedItem].key
        );
    }
}
