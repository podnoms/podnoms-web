import {
    Component,
    Input,
    ElementRef,
    OnChanges,
    ViewChild,
    SimpleChanges,
    ChangeDetectionStrategy
} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Podcast, MasterDetailCommands } from '../../core';

@Component({
    selector: 'app-podcast-detail',
    templateUrl: './podcast-detail.component.html',
    styleUrls: ['./podcast-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PodcastDetailComponent {
    @Input() podcast: Podcast;

    constructor() {}
}
