import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    AfterViewInit,
    HostListener
} from '@angular/core';
import { Podcast } from '../../core';
import { UtilityService } from '../../shared/services/utility.service';
import { BasePageComponent } from '../../shared/components/base-page/base-page.component';
import { ImageUploadComponent } from '../../shared/components/image-upload/image-upload.component';

@Component({
    selector: 'app-podcast-add-wizard',
    templateUrl: './podcast-add-wizard.component.html',
    styleUrls: ['./podcast-add-wizard.component.scss']
})
export class PodcastAddWizardComponent extends BasePageComponent
    implements OnInit, AfterViewInit {
    loading: boolean = true;
    currentStep: number = 0;
    errorMessage: string;
    @Input() podcast: Podcast;
    @Output() finish: EventEmitter<Podcast> = new EventEmitter<Podcast>();
    @ViewChild('imageControl') imageControl: ImageUploadComponent;

    @ViewChild('podcastName') podcastName: ElementRef;

    constructor(private utilityService: UtilityService) {
        super();
    }
    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            this.next();
        }
    }
    ngOnInit() {
        console.log('podcast-add-wizard.component', 'ngOnInit', this.loading, this.podcast);
        if (!this.podcast.imageUrl) {
            this.utilityService.getTemporaryPodcastImageUrl().subscribe(u => {
                this.podcast.imageUrl = u;
                this.loading = false;
            }, err => (this.loading = false));
        } else {
            this.loading = false;
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
        if (this.currentStep < 3) {
            this.errorMessage = '';
            this.currentStep++;
        }
    }
    finishUp() {
        this.finish.emit(this.podcast);
    }
}
