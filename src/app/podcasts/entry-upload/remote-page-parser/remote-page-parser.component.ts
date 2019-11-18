import {
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    EventEmitter,
    Output,
    AfterViewInit
} from '@angular/core';

@Component({
    selector: 'app-remote-page-parser',
    templateUrl: './remote-page-parser.component.html',
    styleUrls: ['./remote-page-parser.component.scss']
})
export class RemotePageParserComponent implements AfterViewInit, OnChanges {
    @Input()
    remoteAudioList: any;
    @Output()
    pageEntryChosen: EventEmitter<any> = new EventEmitter();
    selectedItem: string = '0';
    errorText = '';

    constructor() {}

    ngAfterViewInit() {
        console.log(
            'remote-page-parser.component',
            'ngOnInit',
            this.remoteAudioList
        );
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes.remoteAudioList) {
            this._paintAudio();
        }
    }
    createEntry(callback) {
        const url = this.remoteAudioList[this.selectedItem].value;
        if (url) {
            this.pageEntryChosen.emit({
                url: url,
                callback: callback
            });
        } else {
            this.errorText = '^^ select something please?';
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
