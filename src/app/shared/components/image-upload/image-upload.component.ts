import {
    Component,
    Input,
    ViewChild,
    ElementRef,
    Renderer2,
    OnInit,
    Output,
    EventEmitter
} from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
    private _imageFileBuffer: File;

    image: any = new Image();
    imageChanged: boolean = false;

    @Input() imageUrl: string;

    @ViewChild('fileInput') fileInputElement: ElementRef;

    constructor(private imageService: ImageService, private renderer: Renderer2) {}
    ngOnInit() {
        this.image.src = this.imageUrl;
    }
    __PASTEdummyCodeHolderFunction() {
        // this.renderer.listen('document', 'paste', e => {
        //     console.log('Paste', e);
        //     for (let i = 0; i < e.clipboardData.items.length; i++) {
        //         const item = e.clipboardData.items[i];
        //         if (item.kind === 'file') {
        //             this._imageFileBuffer = item.getAsFile();
        //             this._parseImageData(this._imageFileBuffer);
        //         }
        //     }
        // });
    }
    commitImage(slug: string): Observable<string> {
        if (this.imageChanged) {
            return this.imageService.upload(slug, this._imageFileBuffer);
        }
        return of(null);
    }
    callFileInput() {
        this.fileInputElement.nativeElement.click();
    }
    fileChangeEvent() {
        const nativeElement: HTMLInputElement = this.fileInputElement.nativeElement;
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
