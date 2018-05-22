import {
    Component,
    OnInit,
    EventEmitter,
    ElementRef,
    Output,
    Input,
    ViewChild
} from '@angular/core';
import { Podcast, ToastService } from '../../../core';
import { AuthService } from '../../../auth/auth.service';
import { environment } from '../../../../environments/environment';
import * as Dropzone from 'dropzone';

@Component({
    selector: 'app-upload-file',
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
    @Input() podcast: Podcast;
    @Output() onUploadComplete: EventEmitter<any> = new EventEmitter();
    @ViewChild('uploader') el: ElementRef;

    constructor(private toastyService: ToastService, private authService: AuthService) {}
    ngOnInit() {
        const config = {
            url: `${environment.apiHost}/podcast/${this.podcast.slug}/audioupload`,
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
