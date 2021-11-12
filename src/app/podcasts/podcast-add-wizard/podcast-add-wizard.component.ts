import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input, Output,
    ViewChild
} from '@angular/core';
import { Category, Podcast } from '../../core';
import { BasePageComponent } from '../../shared/components/base-page/base-page.component';
import { ImageUploadComponent } from '../../shared/components/image-upload/image-upload.component';
import { UtilityService } from '../../shared/services/utility.service';

@Component({
    selector: 'app-podcast-add-wizard',
    templateUrl: './podcast-add-wizard.component.html',
    styleUrls: ['./podcast-add-wizard.component.scss'],
})
export class PodcastAddWizardComponent
    extends BasePageComponent
    implements AfterViewInit {
    currentStep: number = 0;
    errorMessage: string;
    @Input()
    podcast: Podcast;
    @Output()
    finish: EventEmitter<Podcast> = new EventEmitter<Podcast>();
    @ViewChild('imageControl')
    imageControl: ImageUploadComponent;

    category: string;

    @ViewChild('podcastName')
    podcastName: ElementRef;

    constructor(private utilityService: UtilityService) {
        super();
    }
    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.next();
        }
    }

    ngAfterViewInit() {
        this.podcastName.nativeElement.focus();
    }
    getImageControl(): ImageUploadComponent {
        return this.imageControl;
    }
    previous() {
        if (this.currentStep > 0) {
            this.currentStep--;
        }
    }
    next() {
        if (this.currentStep === 0 && !this.podcast.title) {
            this.errorMessage = 'Please give me a title!';
            return;
        }
        if (this.currentStep === 2 && !this.imageControl.imageChanged) {
            this.errorMessage = 'You must choose an image!';
            return;
        }
        if (this.currentStep === 3 && !this.category) {
            this.errorMessage = 'You must add a category!';
            return;
        }
        if (this.currentStep < 4) {
            this.currentStep++;
        }
        this.errorMessage = '';
    }
    finishUp() {
        this.errorMessage = '';
        this.podcast.category = new Category(this.category);
        this.finish.emit(this.podcast);
    }
}
