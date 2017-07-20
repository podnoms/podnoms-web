import {Router, ActivatedRoute} from '@angular/router';
import {ToastyService} from 'ng2-toasty';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {Component, OnInit} from '@angular/core';
import {PodcastModel} from 'app/models/podcasts.models';
import {PusherService} from '../../services/pusher.service';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-podcast-upload-form',
    templateUrl: './podcast-upload-form.component.html',
    styleUrls: ['./podcast-upload-form.component.css']
})
export class PodcastUploadFormComponent implements OnInit {
    podcast: PodcastModel;
    config: DropzoneConfigInterface = {
        acceptedFiles: 'audio/*',
        headers: {
            'Authorization': 'Bearer ' + this._auth.getToken()
        }
    };

    constructor(private _router: Router, private _route: ActivatedRoute,
                private _toastyService: ToastyService, private _pusherService: PusherService,
                private _auth: AuthService) {
        this.podcast = new PodcastModel();
        _route.params.subscribe(p => {
            this.podcast.slug = p['slug'];
            this.config.server = `/api/podcast/${this.podcast.slug}/audioupload`;
        });
    }

    ngOnInit() {
    }

    onUploadStart() {
        this._pusherService.subscribeMessage(this.podcast.id + '__process_podcast', 'info_processed', t => {
        });
        this._pusherService.subscribeMessage(this.podcast.id + '__process_podcast', 'info_progress', t => {
            console.log('EntryListItemComponent', 'info_progress', t);
        });
    }

    onUploadError(event) {
        this._toastyService.success(`Boo\n${event}`);
    }

    onUploadSuccess(event) {
        this._router.navigateByUrl(`/podcasts#${this.podcast.slug}`);
    }
}
