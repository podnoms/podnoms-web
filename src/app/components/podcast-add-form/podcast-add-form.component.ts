import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PodcastModel } from '../../models/podcasts.models';
import { PodcastsService } from '../../services/podcasts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageService } from 'app/services/image.service';

@Component({
    selector: 'app-podcast-add-form',
    templateUrl: './podcast-add-form.component.html',
    styleUrls: ['./podcast-add-form.component.css']
})
export class PodcastAddFormComponent implements OnInit {
    podcast: PodcastModel;
    @ViewChild('fileInput') fileInput: ElementRef;
    private imageChanged = false;
    image: any = new Image();

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
                .subscribe(r => {
                    this.podcast = r;
                    if (this.podcast.image) {
                        this.image.src = this.podcast.image;
                    }
                });
        }
    }
    submitForm() {
        this._service.addPodcast(this.podcast)
            .subscribe(p => {
                if (this.imageChanged) {
                    this.uploadPhoto()
                        .subscribe(r => {
                            console.log('PodcastAddForm', 'submitForm', r);
                            this._router.navigateByUrl('/podcasts')
                        });
                } else {
                    this._router.navigateByUrl('/podcasts');
                }
            });
    }
    uploadPhoto() {
        const nativeElement: HTMLInputElement = this.fileInput.nativeElement;
        return this._imageService.upload(this.podcast.id, nativeElement.files[0]);
    }
    fileChangeEvent() {
        const nativeElement: HTMLInputElement = this.fileInput.nativeElement;
        const file: File = nativeElement.files[0];
        const myReader: FileReader = new FileReader();
        const that = this;
        myReader.onloadend = function (loadEvent: any) {
            that.image = new Image();
            that.image.src = loadEvent.target.result;
            that.imageChanged = true;
        };
        myReader.readAsDataURL(file);
    }
}
