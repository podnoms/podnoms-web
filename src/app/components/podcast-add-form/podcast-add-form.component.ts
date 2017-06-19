import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PodcastModel} from '../../models/podcasts.models';
import {PodcastsService} from '../../services/podcasts.service';
import {Router, ActivatedRoute} from '@angular/router';
import {ImageService} from 'app/services/image.service';

@Component({
    selector: 'app-podcast-add-form',
    templateUrl: './podcast-add-form.component.html',
    styleUrls: ['./podcast-add-form.component.css']
})
export class PodcastAddFormComponent implements OnInit {
    podcast: PodcastModel;
    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(private _service: PodcastsService, private _imageService: ImageService,
                private _router: Router, private _route: ActivatedRoute) {
        this.podcast = new PodcastModel();

        _route.params.subscribe(p => {
            this.podcast.slug = p['slug'];
        });
    }

    ngOnInit() {
        if (this.podcast && this.podcast.slug) {
            this._service.getPodcast(this.podcast.slug)
                .subscribe(r => this.podcast = r);
        }
    }

    submitForm() {
        this._service.addPodcast(this.podcast)
            .subscribe(p => {
                this.podcast = p;
                this._router.navigateByUrl('/podcasts');
            });
    }

    uploadPhoto() {
        const nativeElement: HTMLInputElement = this.fileInput.nativeElement;
        this._imageService.upload(this.podcast.id, nativeElement.files[0]);
    }
}
