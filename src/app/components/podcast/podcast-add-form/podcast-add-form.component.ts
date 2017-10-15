import { AddPodcastAction } from './../../../actions/podcast.actions';
import { AddAction } from './../../../actions/entries.actions';
import { ApplicationState } from 'app/store';
import { Store } from '@ngrx/store';
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
export class PodcastAddFormComponent {
    podcast: PodcastModel;
    @ViewChild('fileInput') fileInput: ElementRef;
    private imageChanged = false;
    image: any = new Image();

    constructor(
        private _imageService: ImageService,
        private _store: Store<ApplicationState>,
        private _toastyService: ToastyService) {
        this.podcast = new PodcastModel();
    }

    submitForm() {
        this._store.dispatch(new AddPodcastAction(this.podcast));
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
