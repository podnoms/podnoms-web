import { Router, ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PodcastEntryModel, PodcastModel } from 'app/models/podcasts.models';
import { PusherService } from '../../services/pusher.service';
import { AuthService } from '../../services/auth.service';

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
        headers: {
            'Authorization': 'Bearer ' + this._auth.getToken()
        }
    };

    constructor(private _toastyService: ToastyService, private _pusherService: PusherService,
                private _auth: AuthService) {
    }

    ngOnInit() {
        this.config.url = `/api/podcast/${this.podcast.slug}/audioupload`;
    }

    onUploadStart() {
        this._pusherService.subscribeMessage(this.podcast.id + '__process_podcast', 'info_progress', t => {
            console.log('EntryListItemComponent', 'info_progress', t);
        });
    }

    onUploadError(event) {
        this._toastyService.error(`Boo\n${event}`);
    }

    onUploadSuccess(event) {
        this._toastyService.success('Successfully uploaded audio');
        this.onUploadComplete.emit(event);
    }
}
