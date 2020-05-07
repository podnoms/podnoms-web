import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef,
    OnDestroy
} from '@angular/core';
import { AudioService, PlayState } from '../../../core/audio.service';
import { NowPlaying } from 'app/core/model/now-playing';
import { WaveformService } from 'app/shared/services/waveform.service';
import { NgxAudioplayerComponent } from '@podnoms/ngx-audioplayer';
import { NgxFancyLoggerService } from 'ngx-fancy-logger';

@Component({
    selector: 'app-footer-player',
    templateUrl: './footer-player.component.html',
    styleUrls: ['./footer-player.component.scss']
})
export class FooterPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('player')
    player: any;

    nowPlaying: NowPlaying = new NowPlaying(null, null);
    pcmUrl: string = '';

    initialised: boolean = false;
    constructor(
        private audioService: AudioService,
        private waveformService: WaveformService,
        protected logger: NgxFancyLoggerService
    ) {}
    ngOnInit() {}
    ngAfterViewInit() {
        this.audioService.nowPlaying$.subscribe(nowPlaying => {
            if (nowPlaying.url) {
                this.nowPlaying = nowPlaying;
                this.waveformService
                    .getForItem(nowPlaying.entry.id)
                    .subscribe(pcmUrl => {
                        this.initialised = true;
                        this.pcmUrl = pcmUrl;
                        this.audioService.audioLoaded();
                    });
            }
        });
        this.audioService.playState$.subscribe(s => {
            if (s === PlayState.none) {
                this.player.stop();
            }
        });
    }
    ngOnDestroy() {
        this.logger.debug(
            'footer-player.component',
            'ngOnDestroy',
            'Waaaaaasted'
        );
    }
}
