import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Podcast, PodcastEntry } from '../../../core';
import { environment } from '../../../../environments/environment';
import { PodcastDataService } from '../../podcast-data.service';
import { BaseJsUploadComponent } from '../../base-js-upload.component';
import { EntryDataService } from '../../entry-data.service';
declare var Dropbox: any;

@Component({
    selector: 'app-upload-dropbox',
    templateUrl: './upload-dropbox.component.html',
    styleUrls: ['./upload-dropbox.component.scss']
})
export class UploadDropboxComponent extends BaseJsUploadComponent implements OnInit {
    errorText: string;
    isPosting: boolean = false;

    constructor(podcastEntryDataService: EntryDataService) {
        super(podcastEntryDataService);
        this.loadScript('https://www.dropbox.com/static/api/2/dropins.js', 'dropboxjs', {
            'data-app-key': environment.dropboxAppKey
        });
    }

    ngOnInit() {}

    browseDropbox() {
        const that = this;
        const options = {
            // Required. Called when a user selects an item in the Chooser.
            success: function(files) {
                that.isPosting = true;
                const name = files[0].name;
                const urlToCheck = files[0].link;
                that.processPodcast(name, urlToCheck).subscribe(e => that.entryCreateComplete.emit(e));
            },
            linkType: 'direct', // or "direct"
            multiselect: false, // or true
            extensions: ['.mp3', '.wav'],
            folderselect: false // or true
        };

        Dropbox.choose(options);
    }
}
