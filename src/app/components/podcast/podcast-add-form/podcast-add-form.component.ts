import { PodcastModel } from './../../../models/podcasts.models';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageService } from 'app/services/image.service';
import { ToastyService } from 'ng2-toasty';

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

    constructor(
        private _imageService: ImageService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _toastyService: ToastyService) {
        this.podcast = new PodcastModel();
        _route.params.subscribe(p => {
            if (p['slug']) {
                this.podcast.slug = p['slug'];
            }
        });
    }

    ngOnInit() {
    }

    submitForm() {

    }

    uploadPhoto() {
        const nativeElement: HTMLInputElement = this.fileInput.nativeElement;
        return this._imageService.upload(this.podcast.slug, nativeElement.files[0]);
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
