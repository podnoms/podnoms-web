import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { BasePageComponent } from '../../shared/components/base-page/base-page.component';
import { Observable, of } from 'rxjs';
import { Podcast, PodcastEntry } from '../../core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../../shared/services/utility.service';
import { ImageService } from '../../shared/services/image.service';
import { PodcastStoreService } from '../podcast-store.service';
import { PodcastDataService } from '../podcast-data.service';
import { FormGroup } from '@angular/forms';
import { map, switchMap } from 'rxjs/operators';
import { Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { persistOps, EntityActions, EntityAction, EntityOp } from 'ngrx-data';
@Component({
    selector: 'app-podcast-edit-form',
    templateUrl: './podcast-edit-form.component.html',
    styleUrls: ['./podcast-edit-form.component.scss']
})
export class PodcastEditFormComponent extends BasePageComponent implements OnInit {
    _imageFileBuffer: File;
    @ViewChild('fileInput') fileInput: ElementRef;
    private imageChanged = false;
    image: any = new Image();
    checkingDomain: boolean = false;
    domainValid: boolean = false;
    podcast$: Observable<Podcast>;
    private form: FormGroup;

    sending = false;
    options = {
        toolbarButtons: [
            'undo',
            'redo',
            '|',
            'bold',
            'italic',
            'underline',
            'strikeThrough',
            'subscript',
            'superscript',
            'outdent',
            'indent',
            'clearFormatting',
            'insertTable',
            'html'
        ],
        height: 300
    };
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private utilityService: UtilityService,
        private _imageService: ImageService,
        private podcastStoreService: PodcastStoreService,
        private podcastDataService: PodcastDataService,
        private renderer: Renderer2,
        private actions$: EntityActions
    ) {
        super();
        const actionFilter = `[Podcast] ${EntityOp.SAVE_ADD_ONE_SUCCESS}`;
        console.log('podcast-edit-form.component', 'actionFilter', actionFilter);
        this.actions$
            .where(a => a.entityName === 'Podcast' && a.op === EntityOp.SAVE_ADD_ONE_SUCCESS)
            .pipe(
                map(a => a.payload),
                map(r => {
                    console.log('podcast-edit-form.component', 'map', r);
                    this.router.navigate(['podcasts', r.slug]);
                    return { type: 'SUCCESS', payload: r };
                })
            )
            .subscribe(r => {
                console.log('podcast-edit-form.component', 'action', r);
            });
    }

    _checkResults(action: EntityAction) {
        console.log('podcast-edit-form.component', 'checkResults', action);
        return {
            type: 'test-action',
            payload: action, // the incoming action
            entityName: action.entityName
        };
    }
    ngOnInit() {
        const id = this.route.snapshot.params.podcast;
        if (!id) {
            this.podcast$ = of(new Podcast());
        } else {
            this.podcastStoreService.entities$
                .pipe(map(r => r.filter(it => it.slug === id)))
                .subscribe(p => {
                    const podcast = p[0];
                    if (podcast) {
                        this.image.src = podcast.imageUrl;
                        this.podcast$ = of(podcast);
                    }
                });
        }
        this.renderer.listen('document', 'paste', e => {
            console.log('Paste', e);
            for (let i = 0; i < e.clipboardData.items.length; i++) {
                const item = e.clipboardData.items[i];
                if (item.kind === 'file') {
                    this._imageFileBuffer = item.getAsFile();
                    this._parseImageData(this._imageFileBuffer);
                    const nativeElement: HTMLInputElement = this.fileInput.nativeElement;
                }
            }
        });
    }
    deletePodcast(podcast: Podcast) {
        console.log('PodcastComponent', 'deletePodcast');
        this.podcastDataService
            .deleteEntry(podcast.id)
            .subscribe(r => this.podcastStoreService.delete(podcast));
        this.router.navigate(['/']);
    }
    submitForm(podcast: Podcast) {
        this.sending = true;
        if (this.imageChanged) {
            this.uploadPhoto(podcast).subscribe(r => {
                podcast.imageUrl = r.imageUrl;
                this.sending = false;
            });
        } else {
            if (podcast.id) {
                this.podcastStoreService.update(podcast);
            } else {
                this.podcastStoreService.add(podcast);
            }
        }
    }
    checkDomain(domain: string) {
        this.checkingDomain = true;
        this.utilityService.checkDomain(domain).subscribe(e => (this.domainValid = e));
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
