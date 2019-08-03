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
declare var dzsap_init: any;
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
                    .subscribe(d => {
                        this.waveformService.getRemotePeakData(d).subscribe(
                            peaks => {
                                this.pcm = peaks.toString();
                                this._startPlayerSetupHook(nowPlaying);
                            },
                            error => {
                                this.pcm = null;
                                this._startPlayerSetupHook(nowPlaying);
                            }
                        );
                    });
            }
        });
    }
    _startPlayerSetupHook(nowPlaying: NowPlaying) {
        this.nowPlaying = nowPlaying;
        this.cdRef.detectChanges();
        setTimeout(() => this._setupPlayer(), 1000);
    }
    _setupPlayer() {
        this.scriptService.load('zoom').then(() => {
            console.log(
                'footer-player.component',
                'ngOnInit',
                'Scripts loaded successfully'
            );
            const settings_ap = {
                disable_volume: 'off',
                autoplay: 'on',
                cue: 'on',
                disable_scrub: 'default',
                design_skin: 'skin-wave',
                skinwave_wave_mode: 'canvas',
                skinwave_dynamicwaves: 'on',
                skinwave_enableSpectrum: 'off',
                settings_backup_type: 'full',
                skinwave_spectrummultiplier: '4',
                skinwave_comments_enable: 'off',
                skinwave_mode: 'small'
            };
            if (!this.initialised) {
                const c = dzsap_init(this.player.nativeElement, settings_ap);
                this.initialised = true;
            } else {
                this.player.nativeElement.api_change_media(null, {
                    type: 'audio',
                    fakeplayer_is_feeder: 'off',
                    artist: this.nowPlaying.entry.podcastTitle,
                    source: this.nowPlaying.entry.audioUrl,
                    song_name: this.nowPlaying.entry.title,
                    autoplay: 'on',
                    thumb: this.nowPlaying.entry.thumbnailUrl,
                    pcm: '[' + this.pcm + ']'
                });
            }
        });
    }
}
