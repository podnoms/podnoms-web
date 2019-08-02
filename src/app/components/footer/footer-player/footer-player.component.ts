import {
    Component,
    OnInit,
    AfterViewInit,
    ViewChild,
    ElementRef,
    ViewChildren,
    QueryList
} from '@angular/core';
import {
    AudioService,
    PlayState as PlayStates
} from '../../../core/audio.service';
import { ScriptService } from 'app/core/scripts/script.service';
import { NowPlaying } from 'app/core/model/now-playing';
declare var dzsap_init: any;

@Component({
    selector: 'app-footer-player',
    templateUrl: './footer-player.component.html',
    styleUrls: ['./footer-player.component.scss']
})
export class FooterPlayerComponent implements OnInit, AfterViewInit {
    @ViewChild('player', { static: true })
    player: ElementRef;

    nowPlaying: NowPlaying = new NowPlaying('', '', '', '');

    playerSettings = {
        disable_volume: 'off',
        autoplay: 'on',
        disable_scrub: 'default',
        pcm_data_try_to_generate: 'on',
        design_skin: 'skin-wave',
        skinwave_dynamicwaves: 'on',
        skinwave_enableSpectrum: 'off',
        settings_backup_type: 'full',
        settings_useflashplayer: 'auto',
        skinwave_spectrummultiplier: '4',
        skinwave_comments_enable: 'off',
        skinwave_mode: 'small',
        construct_player_list_for_sync: 'on',
        footer_btn_playlist: 'on'
    };
    constructor(
        private audioService: AudioService,
        private scriptService: ScriptService
    ) {}
    ngOnInit() {}
    ngAfterViewInit() {
        this.audioService.nowPlaying$.subscribe(r => {
            if (r.url) {
                this.scriptService.load('zoom').then(() => {
                    console.log(
                        'footer-player.component',
                        'ngOnInit',
                        'Scripts loaded successfully'
                    );
                    dzsap_init(this.player.nativeElement, this.playerSettings);
                });
            }
        });
    }
}
