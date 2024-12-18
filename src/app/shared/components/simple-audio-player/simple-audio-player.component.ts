import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-simple-audio-player',
    templateUrl: './simple-audio-player.component.html',
    styleUrls: ['./simple-audio-player.component.scss'],
    standalone: false
})
export class SimpleAudioPlayerComponent {
    @Input()
    src: string = '';

    constructor() {}
}
