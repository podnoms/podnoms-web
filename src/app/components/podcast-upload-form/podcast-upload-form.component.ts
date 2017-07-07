import {Router, ActivatedRoute} from '@angular/router';
import {ToastyService} from 'ng2-toasty';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {Component, OnInit} from '@angular/core';
import {PodcastModel} from 'app/models/podcasts.models';
import {PusherService} from '../../services/pusher.service';

@Component({
    selector: 'app-podcast-upload-form',
    templateUrl: './podcast-upload-form.component.html',
    styleUrls: ['./podcast-upload-form.component.css']
})
export class PodcastUploadFormComponent implements OnInit {
    podcast: PodcastModel;
    private config: DropzoneConfigInterface = {
        acceptedFiles: 'audio/*'
    };

    constructor(private _router: Router, private _route: ActivatedRoute,
                private _toastyService: ToastyService, private _pusherService: PusherService) {
        this.podcast = new PodcastModel();
        _route.params.subscribe(p => {
            this.podcast.slug = p['slug'];
            this.config.server = `/api/podcast/${this.podcast.slug}/audioupload`;
        });
    }

    ngOnInit() {
    }

    onUploadError(event) {
        this._toastyService.success(`Boo\n${event}`);
    }

    onUploadSuccess(event) {
        debugger;
        this._toastyService.success('Yay!');
    }
}
