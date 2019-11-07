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
    OnChanges
} from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit, OnChanges {
    private _imageFileBuffer: File;
    defaultImage: string = 'assets/img/image-placeholder.png';
    image: any = new Image();
    public imageChanged: boolean = false;

    @Input() imageUrl: string;

    @ViewChild('fileInput', { static: false }) fileInputElement: ElementRef;

    constructor(
        private imageService: ImageService,
        private renderer: Renderer2
    ) {}
    ngOnInit() {
        this.image.src = this.imageUrl;
        this._initPasteHandler();
    }
    ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
        // console.log('image-upload.component', 'ngOnchanges', changes);
        // if (changes && changes.imageUrl && !this.image.src) {
        //     this.image.src = changes.imageUrl.currentValue;
        // }
    }
    _initPasteHandler() {
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
    handleBrokenUrl($event) {
        this.image.src = this.defaultImage;
    }
    updateImage(image: string) {
        this.image.src = image;
        this.imageUrl = image;
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
