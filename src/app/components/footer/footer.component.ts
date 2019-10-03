import { Component, OnInit } from '@angular/core';
import { AudioService, PlayState } from '../../core/audio.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    showPlayer: boolean = false;
    constructor(private audioService: AudioService) {}

    ngOnInit() {
        this.audioService.playState$.subscribe(s => {
            this.showPlayer = s === PlayState.playing || s === PlayState.paused;
            if (!this.showPlayer) {
                console.log(
                    'footer.component',
                    'showPlayer',
                    'NOTSHOWINGPLAYER'
                );
            }
        });
    }
}
