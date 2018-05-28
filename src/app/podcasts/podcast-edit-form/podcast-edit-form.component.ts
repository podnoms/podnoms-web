import {
    Component,
    OnInit,
    ElementRef,
    ViewChild,
    Renderer2,
    AfterViewInit
} from '@angular/core';
import { BasePageComponent } from '../../shared/components/base-page/base-page.component';
import { Observable, of } from 'rxjs';
import { Podcast } from '../../core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../../shared/services/utility.service';
import { ImageService } from '../../shared/services/image.service';
import { PodcastStoreService } from '../podcast-store.service';
import { PodcastDataService } from '../podcast-data.service';
import { FormGroup } from '@angular/forms';
import { map, filter } from 'rxjs/operators';
import { EntityOp, EntityAction, ofEntityOp } from 'ngrx-data';
import { Actions } from '@ngrx/effects';
@Component({
    selector: 'app-podcast-edit-form',
    templateUrl: './podcast-edit-form.component.html',
    styleUrls: ['./podcast-edit-form.component.scss']
})
export class PodcastEditFormComponent implements OnInit /*, AfterViewInit*/ {
    _imageFileBuffer: File;
    @ViewChild('fileInput') fileInputElement: ElementRef;
    @ViewChild('podcastName') podcastNameElement: ElementRef;

    private imageChanged = false;
    firstRun: boolean = false;

    image: any = new Image();
    checkingDomain: boolean = false;
    domainValid: boolean = false;
    loading: boolean = false;
    podcast$: Observable<Podcast>;

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
        private actions$: Actions
    ) {
        console.log('podcast-edit-form', 'constructor');
        // super();
        // this._createEntitySavedObserver();
    }
    _createEntitySavedObserver(): any {
        this.actions$
            .pipe(
                ofEntityOp(),
                filter(
                    (ea: EntityAction) =>
                        ea.entityName === 'Podcast' && ea.op === EntityOp.SAVE_ADD_ONE_SUCCESS
                )
            )
            .subscribe(r => {
                if (r.type === 'SUCCESS') {
                    this.router.navigate(['podcasts', r.payload.slug]);
                }
            });
    }
    ngOnInit() {
        console.log('ngOnInit');
        const id = this.route.snapshot.params.podcast;
        this.firstRun = this.route.snapshot.params.firstRun || false;
        if (!id) {
            const podcast = new Podcast();
            this.utilityService.getTemporaryPodcastImageUrl().subscribe(u => {
                podcast.imageUrl = u;
                this.podcast$ = of(podcast);
            }, err => (this.podcast$ = of(podcast)));
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
                }
            }
        });
    }
    ngAfterViewInit() {
        if (!this.firstRun && this.podcastNameElement && this.podcastNameElement.nativeElement) {
            this.podcastNameElement.nativeElement.focus();
        }
    }
    deletePodcast(podcast: Podcast) {
        console.log('PodcastComponent', 'deletePodcast');
        this.podcastDataService
            .deleteEntry(podcast.id)
            .subscribe(() => this.podcastStoreService.delete(podcast));
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
        this.fileInputElement.nativeElement.click();
    }
    uploadPhoto(podcast) {
        return this._imageService.upload(podcast.slug, this._imageFileBuffer);
    }
    fileChangeEvent() {
        const nativeElement: HTMLInputElement = this.fileInputElement.nativeElement;
        this._imageFileBuffer = nativeElement.files[0];
        this._parseImageData(this._imageFileBuffer);
    }
    onWizardFinish(podcast: Podcast) {
        this.submitForm(podcast);
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
