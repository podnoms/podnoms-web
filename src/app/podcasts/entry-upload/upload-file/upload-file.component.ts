import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Podcast } from '../../../core';
import { AuthService } from '../../../auth/auth.service';
import { environment } from '../../../../environments/environment';
import { DropzoneConfig, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AlertService } from '../../../core/alerts/alert.service';

@Component({
    selector: 'app-upload-file',
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
    @Input() podcast: Podcast;
    @Output() uploadComplete: EventEmitter<any> = new EventEmitter();

    config: DropzoneConfigInterface = {
        acceptedFiles: 'audio/*',
        maxFilesize: 4000, // 4Gb
        timeout: 1000 * (60 * 120), /// 2 hours
        headers: {
            Authorization: 'Bearer ' + this.authService.getAuthToken()
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
    constructor(
        private alertService: AlertService,
        private authService: AuthService
    ) {}
    ngOnInit() {
        this.config.url = `${environment.apiHost}/podcast/${this.podcast.slug}/audioupload?ngsw-bypass`;
    }
    onUploadError(event) {
        this.alertService.error('Error', `Error uploading audio\n${event}`);
        this.uploadComplete.emit(null);
    }
    onUploadSuccess(result) {
        this.uploadComplete.emit(result[1]);
    }
}
