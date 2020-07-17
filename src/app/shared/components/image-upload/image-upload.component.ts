import {
    Component,
    Input,
    ViewChild,
    ElementRef,
    Renderer2,
    OnInit,
    Output,
    EventEmitter,
    SimpleChange,
    OnChanges,
} from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Observable, of } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit, OnChanges {
    private _imageFileBuffer: File;
    defaultImage: string = 'assets/img/image-placeholder.png';
    image: any = new Image();
    public imageChanged: boolean = false;
    computedHeight: number = 500;

    @Input() imageUrl: string;
    @Input() allowRandom: boolean = false;

    @ViewChild('fileInput') fileInputElement: ElementRef;
    @ViewChild('container') containerElement: ElementRef;

    constructor(
        private imageService: ImageService,
        private renderer: Renderer2,
        protected logger: NGXLogger
    ) {}
    ngOnInit() {
        this.image.src = this.imageUrl;
        this._initPasteHandler();
    }
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        // this.logger.debug('image-upload.component', 'ngOnchanges', changes);
        // if (changes && changes.imageUrl && !this.image.src) {
        //     this.image.src = changes.imageUrl.currentValue;
        // }
    }
    _initPasteHandler() {
        this.renderer.listen('document', 'paste', (e) => {
            this.logger.debug('Paste', e);
            for (let i = 0; i < e.clipboardData.items.length; i++) {
                const item = e.clipboardData.items[i];
                if (item.kind === 'file') {
                    this._imageFileBuffer = item.getAsFile();
                    this._parseImageData(this._imageFileBuffer);
                }
            }
        });
    }
    onResized($event) {
        this.logger.debug('image-upload.component', 'onResized', $event);
        this.computedHeight = this.containerElement.nativeElement.style.width;
    }
    handleBrokenUrl($event: any) {
        this.image.src = this.defaultImage;
    }
    updateImage(image: string) {
        this.image.src = image;
        this.imageUrl = image;
    }
    showFileChooser() {
        this.fileInputElement.nativeElement.dispatchEvent(
            new MouseEvent('click', { bubbles: true })
        );
    }
    commitImage(slug: string, type: string): Observable<any> {
        if (this.imageChanged) {
            return this.imageService.upload(type, slug, this._imageFileBuffer);
        }
        return of(null);
    }
    callFileInput() {
        this.fileInputElement.nativeElement.click();
    }
    fileChangeEvent() {
        const nativeElement: HTMLInputElement = this.fileInputElement
            .nativeElement;
        this._imageFileBuffer = nativeElement.files[0];
        this._parseImageData(this._imageFileBuffer);
    }
    getRandomImage($event) {
        this.imageService.getRandom().subscribe(
            (r) => {
                this.logger.debug(
                    'image-upload.component',
                    'getRandomImage',
                    r
                );
                this.image.src = r;
                this.imageChanged = true;
                this._imageFileBuffer = this._dataURLtoFile(
                    r,
                    'random-image.jpg'
                );
                $event();
            },
            (e) => {
                this.logger.error(
                    'image-upload.component',
                    'getRandomImage',
                    e
                );
                $event();
            }
        );
    }
    private _dataURLtoFile(dataurl, filename): File {
        const arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
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
