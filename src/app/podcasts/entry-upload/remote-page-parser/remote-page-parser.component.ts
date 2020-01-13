import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-remote-page-parser',
    templateUrl: './remote-page-parser.component.html',
    styleUrls: ['./remote-page-parser.component.scss']
})
export class RemotePageParserComponent {
    @Input()
    remoteAudioData: any;

    selectedItem: string = '0';

    @Output()
    pageEntryChosen: EventEmitter<string> = new EventEmitter<string>();

    errorText = '';

    constructor() {}

    itemChosen($event) {
        this.pageEntryChosen.emit(
            $event && this.remoteAudioData.data[this.selectedItem].value
        );
    }
}
