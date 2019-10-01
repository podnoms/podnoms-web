import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef,
    ViewChildren,
    QueryList,
    ChangeDetectorRef
} from '@angular/core';
import {
    AudioService,
    PlayState as PlayStates
} from '../../../core/audio.service';
import { ScriptService } from 'app/core/scripts/script.service';
import { NowPlaying } from 'app/core/model/now-playing';
import { WaveformService } from 'app/shared/services/waveform.service';
declare var pnplayer_init: any;
declare var change_media: any;

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
        private scriptService: ScriptService,
        private waveformService: WaveformService,
        private cdRef: ChangeDetectorRef
    ) {}
    ngOnInit() {}
    ngAfterViewInit() {
        this.audioService.nowPlaying$.subscribe(nowPlaying => {
            if (nowPlaying.url) {
                this.waveformService
                    .getForItem(nowPlaying.entry.id)
                    .subscribe(d => {});
            }
        });
    }
}
