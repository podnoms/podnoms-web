import { Observable } from 'rxjs/Observable';
import { ApplicationState } from 'app/store';
import { Store } from '@ngrx/store';
import { PodcastModel } from './../../../models/podcasts.models';
import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    Renderer2
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    _imageFileBuffer: File;
    podcast$: Observable<PodcastModel>;
    @ViewChild('fileInput') fileInput: ElementRef;
    private imageChanged = false;
    image: any = new Image();
    sending = false;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _imageService: ImageService,
        private _store: Store<ApplicationState>,
        private renderer: Renderer2
    ) {}

    ngOnInit() {
        this._route.params.subscribe((params) => {
            if (params['slug'] === undefined) {
                this.podcast$ = Observable.of(new PodcastModel());
            } else {
                this.podcast$ = this._store.select(
                    fromPodcast.getSelectedPodcast
                );
                this._store.dispatch(
                    new fromPodcastActions.SelectAction(params['slug'])
                );
            }
        });
        this.podcast$.subscribe((p) => {
            if (p) {
                this.image.src = p.imageUrl;
            }
        });
        this.renderer.listen('document', 'paste', (e) => {
            console.log('Paste', e);
            for (let i = 0; i < e.clipboardData.items.length; i++) {
                const item = e.clipboardData.items[i];
                if (item.kind === 'file') {
                    this._imageFileBuffer = item.getAsFile();
                    this._parseImageData(this._imageFileBuffer);
                    const nativeElement: HTMLInputElement = this.fileInput
                        .nativeElement;
                }
            }
        });
    }

    submitForm(podcast: PodcastModel) {
        this.sending = true;
        if (this.imageChanged) {
            this.uploadPhoto(podcast).subscribe((r) => {
                podcast.imageUrl = r.json().imageUrl;
                this._store.dispatch(
                    new fromPodcastActions.UpdateAction(podcast)
                );
                this.sending = false;
            });
        } else {
            if (podcast.id) {
                this._store.dispatch(
                    new fromPodcastActions.UpdateAction(podcast)
                );
            } else {
                this._store.dispatch(new fromPodcastActions.AddAction(podcast));
            }
        }
    }
    callFileInput() {
        this.fileInput.nativeElement.click();
    }
    uploadPhoto(podcast) {
        const nativeElement: HTMLInputElement = this.fileInput.nativeElement;
        return this._imageService.upload(podcast.slug, this._imageFileBuffer);
    }

    fileChangeEvent() {
        const nativeElement: HTMLInputElement = this.fileInput.nativeElement;
        this._imageFileBuffer = nativeElement.files[0];
        this._parseImageData(this._imageFileBuffer);
    }
    private _parseImageData(file: File) {
        const myReader: FileReader = new FileReader();
        myReader.onloadend = (loadEvent: any) => {
            this.image = new Image();
            this.image.src = loadEvent.target.result;
            this.imageChanged = true;
        };
        myReader.readAsDataURL(file);
    }
}
