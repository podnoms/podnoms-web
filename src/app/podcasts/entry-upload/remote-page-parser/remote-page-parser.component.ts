import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-remote-page-parser',
    templateUrl: './remote-page-parser.component.html',
    styleUrls: ['./remote-page-parser.component.scss']
})
export class RemotePageParserComponent implements OnInit, OnChanges {
    @Input()
    remoteAudioList: any;
    @Output()
    pageEntryChosen: EventEmitter<string> = new EventEmitter();
    selectedAudioUrl = 0;
    errorText = '';

    constructor() {}

    ngOnInit() {}
    ngOnChanges(changes: SimpleChanges) {
        if (changes.remoteAudioList) {
            this._paintAudio();
        }
    }
    createEntry(url: string) {
        if (url) {
            this.pageEntryChosen.emit(url);
        } else {
            this.errorText = 'Please select an item';
        }
    }
    cancelCreate() {
        this.pageEntryChosen.emit('');
    }
    _paintAudio() {
        for (const name in this.remoteAudioList) {
            if (this.remoteAudioList.hasOwnProperty(name)) {
            }
        }
    }
}
