import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { AuthService } from 'app/services/auth.service';
import { PodcastModel } from 'app/models/podcasts.models';

@Component({
    selector: 'app-podcast-upload-form',
    templateUrl: './podcast-upload-form.component.html',
    styleUrls: ['./podcast-upload-form.component.css']
})
export class PodcastUploadFormComponent implements OnInit {
    @Input() podcast: PodcastModel;
    @Output() onUploadComplete: EventEmitter<any> = new EventEmitter();
    config: DropzoneConfigInterface = {
        acceptedFiles: 'audio/*',
        maxFilesize: 4000, // 4Gb
        timeout: 1000 * (60 * 120), /// 2 hours
        headers: {
            'Authorization': 'Bearer ' + this._auth.getToken()
        },
        maxFiles: 1
    };
    constructor(private _toastyService: ToastyService,
        private _auth: AuthService) {
    }
    ngOnInit() {
        this.config.url = `/api/podcast/${this.podcast.slug}/audioupload`;
    }
    onUploadError(event) {
        this._toastyService.error(`Boo\n${event}`);
    }
    onUploadSuccess(event) {
        this._toastyService.success('Successfully uploaded audio');
        this.onUploadComplete.emit(event[1]);
    }
}
