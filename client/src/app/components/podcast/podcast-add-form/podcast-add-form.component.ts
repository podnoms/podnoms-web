import { Observable } from 'rxjs/Observable';
import { AddAction } from './../../../actions/entries.actions';
import { ApplicationState } from 'app/store';
import { Store } from '@ngrx/store';
import { PodcastModel } from './../../../models/podcasts.models';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'app/services/image.service';
import { ToastyService } from 'ng2-toasty';

import * as fromPodcast from 'app/reducers';
import * as fromPodcastActions from 'app/actions/podcast.actions';

@Component({
    selector: 'app-podcast-add-form',
    templateUrl: './podcast-add-form.component.html',
    styleUrls: ['./podcast-add-form.component.css']
})
export class PodcastAddFormComponent implements OnInit {
    podcast$: Observable<PodcastModel>;
    @ViewChild('fileInput') fileInput: ElementRef;
    private imageChanged = false;
    image: any = new Image();

    constructor(
        private _route: ActivatedRoute,
        private _imageService: ImageService,
        private _store: Store<ApplicationState>,
        private _toastyService: ToastyService
    ) {}

    ngOnInit() {
        this._route.params.subscribe(params => {
            if (params['slug'] === undefined) {
                this.podcast$ = Observable.of(new PodcastModel());
            } else {
                this.podcast$ = this._store.select(fromPodcast.getSelectedPodcast);
                this._store.dispatch(new fromPodcastActions.SelectAction(params['slug']));
            }
        });
        this.podcast$.subscribe(p => {
            this.image.src = p.imageUrl}
        );
    }

    submitForm(podcast: PodcastModel) {
        if (this.imageChanged) {
            this.uploadPhoto(podcast).subscribe(r => {
                this._toastyService.info('Image successfully updated!');
                podcast.imageUrl = r.json().imageUrl;
                this._store.dispatch(new fromPodcastActions.UpdateAction(podcast));
            });
        } else {
            this._store.dispatch(new fromPodcastActions.UpdateAction(podcast));
        }
    }

    uploadPhoto(podcast) {
        const nativeElement: HTMLInputElement = this.fileInput.nativeElement;
        return this._imageService.upload(podcast.slug, nativeElement.files[0]);
    }

    fileChangeEvent() {
        const nativeElement: HTMLInputElement = this.fileInput.nativeElement;
        const file: File = nativeElement.files[0];
        const myReader: FileReader = new FileReader();
        const that = this;
        myReader.onloadend = function(loadEvent: any) {
            that.image = new Image();
            that.image.src = loadEvent.target.result;
            that.imageChanged = true;
        };
        myReader.readAsDataURL(file);
    }
}
