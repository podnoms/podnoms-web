import { DropzoneConfigInterface } from './../../shared/dropzone/dropzone.interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import {
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter,
    ElementRef,
    ViewChild
} from '@angular/core';

import { PodnomsAuthService } from 'app/services/podnoms-auth.service';
import { PodcastModel } from 'app/models/podcasts.models';
import { environment } from 'environments/environment';

import * as Dropzone from 'dropzone';

@Component({
    selector: 'app-podcast-upload-form',
    templateUrl: './podcast-upload-form.component.html',
    styleUrls: ['./podcast-upload-form.component.css']
})
export class PodcastUploadFormComponent implements OnInit {
    @Input() podcast: PodcastModel;
    @Output() onUploadComplete: EventEmitter<any> = new EventEmitter();
    @ViewChild('uploader') el: ElementRef;

    constructor(
        private _toastyService: ToastyService,
        private _auth: PodnomsAuthService
    ) {}
    ngOnInit() {
        const config = {
            url: `${environment.API_HOST}/podcast/${
                this.podcast.slug
            }/audioupload`,
            acceptedFiles: 'audio/*',
            maxFilesize: 4000, // 4Gb
            timeout: 1000 * (60 * 120), /// 2 hours
            headers: {
                Authorization: 'Bearer ' + this._auth.getToken()
            },
            maxFiles: 1,
            parallelUploads: 1,
            autoProcessQueue: true,
            previewTemplate: `<div class="dz-preview dz-file-preview">
                <div class="dz-progress">
                    <div class="progress progress-striped active" role="progressbar" aria-valuemin="0"
                         aria-valuemax="100" aria-valuenow="0">
                        <div class="progress-bar progress-bar-success" style="width:0%;" data-dz-uploadprogress></div>
                    </div>
                </div>
                <div class="dz-error-message">
                    <span data-dz-errormessage></span>
                </div>
            </div>`
        };
        const dz = new Dropzone(this.el.nativeElement, config);

        dz.on('success', (event, result) => this.onUploadSuccess(result));
    }
    onUploadError(event) {
        console.error(`Boo\n${event}`);
    }
    onUploadSuccess(result) {
        this.onUploadComplete.emit(result);
    }
}
