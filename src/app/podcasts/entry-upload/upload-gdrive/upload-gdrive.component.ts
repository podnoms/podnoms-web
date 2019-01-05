import { Component, OnInit } from '@angular/core';
import { BaseJsUploadComponent } from '../../base-js-upload.component';
import { EntryDataService } from '../../entry-data.service';

declare var gapi: any;
declare var google: any;

@Component({
    selector: 'app-upload-gdrive',
    templateUrl: './upload-gdrive.component.html',
    styleUrls: ['./upload-gdrive.component.scss']
})
export class UploadGdriveComponent extends BaseJsUploadComponent implements OnInit {
    developerKey = 'AIzaSyAw5b_4i7wRqiYGq0bTIjn9VMREFfGqMFA';
    clientId = '357461672895-2gtfpasdoguj46vvjv0ohmuii2669ubv.apps.googleusercontent.com';
    scope = [
        'profile',
        'email',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file'
    ].join(' ');

    pickerApiLoaded = false;

    constructor(podcastEntryDataService: EntryDataService) {
        super(podcastEntryDataService);
    }

    ngOnInit() {
        this.loadScript('https://apis.google.com/js/api.js', 'google-apis', null);
        this.loadScript('https://apis.google.com/js/platform.js', 'google-apis-platform', null);
        this.loadScript('https://apis.google.com/js/client:plusone.js', 'google-apis-client', null);
    }
    loadGoogleDrive() {
        gapi.load('auth', { callback: this.onAuthApiLoad.bind(this) });
        gapi.load('picker', { callback: this.onPickerApiLoad.bind(this) });
    }

    onAuthApiLoad() {
        gapi.auth.authorize(
            {
                client_id: this.clientId,
                scope: this.scope,
                immediate: false
            },
            this.handleAuthResult.bind(this)
        );
    }
    onPickerApiLoad() {
        this.pickerApiLoaded = true;
    }
    pickerCallback(data) {
        this.isPosting = true;
        if (data[google.picker.Response.ACTION] === google.picker.Action.PICKED) {
            const doc = data[google.picker.Response.DOCUMENTS][0];
            if (this.isValidFileType(doc.name, 'audio')) {
                const fileID = doc[google.picker.Document.ID];
                const url = `http://drive.google.com/uc?id=${fileID}&export=download`;
                this.processPodcast(doc.name, url).subscribe(e => this.entryCreateComplete.emit(e));
            } else {
                const types = this.getSupportedFileTypes('audio');
                const parsedTypes = [types.slice(0, -1).join(', '), types.slice(-1)[0]].join(
                    types.length < 2 ? '' : ' and '
                );
                this.errorText = `This filetype is not supported, supported filetypes are ${parsedTypes}`;
            }
        }
    }
    handleAuthResult(authResult) {
        if (authResult && !authResult.error) {
            if (authResult.access_token) {
                const view = new google.picker.View(google.picker.ViewId.DOCS);
                // view.setMimeTypes('audio/mpeg', 'audio/x-wav');
                const pickerBuilder = new google.picker.PickerBuilder();
                const picker = pickerBuilder
                    .enableFeature(google.picker.Feature.NAV_HIDDEN)
                    .setOAuthToken(authResult.access_token)
                    .addView(view)
                    .setCallback(this.pickerCallback.bind(this))
                    .build();
                picker.setVisible(true);
            }
        }
    }
}
