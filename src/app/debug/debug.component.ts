import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PodcastDataService } from '../podcasts/podcast-data.service';
import { AlertService } from 'app/core/alerts/alert.service';
import { HubConnection } from '@aspnet/signalr';
import { NowPlaying } from 'app/core/model/now-playing';
import { ScriptService } from 'app/core/scripts/script.service';
import { AudioService } from 'app/core/audio.service';
import { WaveformService } from 'app/shared/services/waveform.service';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-debug',
    templateUrl: './debug.component.html',
    styleUrls: ['./debug.component.scss']
})
export class DebugComponent implements OnInit {
    @ViewChild('player', { static: true })
    player: ElementRef;

    audioUrl =
        'https://podnomscdn.blob.core.windows.net/audio/25a33fb1-428c-4ee4-667a-08d72c897f8b.mp3';
    pcmUrl =
        'https://podnomscdn.blob.core.windows.net/waveforms/25a33fb1-428c-4ee4-667a-08d72c897f8b.json';
    title = 'CORRECTY';
    subTitle = 'CORRECTINGTONS';
    imageUrl =
        'https://cdn-l.podnoms.com/images/entry/25a33fb1-428c-4ee4-667a-08d72c897f8b.jpg?width=725&height=748';
    pcm: string = '';

    constructor(
        private alertService: AlertService,
        private audioService: AudioService,
        private httpClient: HttpClient,
        private waveformService: WaveformService,
        private scriptService: ScriptService
    ) {}

    ngOnInit() {}
    showPlayer() {}
    clickProcess($event: () => void) {
        setTimeout(() => $event(), 2000);
    }

    showToast() {
        this.alertService.success(
            'Hello Sailor',
            'Lorem ipsum motherfucker',
            '',
            {
                autoClose: false
            }
        );
    }
}
