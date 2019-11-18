import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BaseJsUploadComponent } from '../../base-js-upload.component';
import { EntryDataService } from '../../entry-data.service';
declare var Dropbox: any;

@Component({
    selector: 'app-upload-dropbox',
    templateUrl: './upload-dropbox.component.html',
    styleUrls: ['./upload-dropbox.component.scss']
})
export class UploadDropboxComponent extends BaseJsUploadComponent
    implements OnInit {
    constructor(podcastEntryDataService: EntryDataService) {
        super(podcastEntryDataService);
        this.loadScript(
            'https://www.dropbox.com/static/api/2/dropins.js',
            'dropboxjs',
            {
                'data-app-key': environment.dropboxAppKey
            }
        );
    }

    ngOnInit() {}

    browseDropbox() {
        const options = {
            // Required. Called when a user selects an item in the Chooser.
            success: this.parseFileList.bind(this),
            linkType: 'direct', // or "direct"
            multiselect: true, // or true
            extensions: this.getSupportedFileTypes('audio'),
            folderselect: false // or true
        };

        Dropbox.choose(options);
    }
}
