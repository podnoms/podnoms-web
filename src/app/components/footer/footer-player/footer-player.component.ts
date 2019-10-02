import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef
} from '@angular/core';
import { AudioService } from '../../../core/audio.service';
import { NowPlaying } from 'app/core/model/now-playing';
import { WaveformService } from 'app/shared/services/waveform.service';

@Component({
    selector: 'app-footer-player',
    templateUrl: './footer-player.component.html',
    styleUrls: ['./footer-player.component.scss']
})
export class FooterPlayerComponent implements OnInit, AfterViewInit {
    @ViewChild('player', { static: true })
    player: ElementRef;

    nowPlaying: NowPlaying = new NowPlaying(null, null);
    pcm: string = '';

    initialised: boolean = false;
    constructor(
        private audioService: AudioService,
        private waveformService: WaveformService
    ) {}
    ngOnInit() {}
    ngAfterViewInit() {
        this.audioService.nowPlaying$.subscribe(nowPlaying => {
            if (nowPlaying.url) {
                this.waveformService
                    .getForItem(nowPlaying.entry.id)
                    .subscribe(() => {
                        // do some stuff
                    });
            }
        });
    }
}
