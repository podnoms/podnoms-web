import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PodcastDataService } from '../podcasts/podcast-data.service';
import { AlertService } from 'app/core/alerts/alert.service';
import { HubConnection } from '@aspnet/signalr';
import { NowPlaying } from 'app/core/model/now-playing';
import { ScriptService } from 'app/core/scripts/script.service';
import { AudioService } from 'app/core/audio.service';
import { WaveformService } from 'app/shared/services/waveform.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { UtilityService } from 'app/shared/services/utility.service';
import { JobService } from 'app/shared/services/job.service';
@Component({
    selector: 'app-debug',
    templateUrl: './debug.component.html',
    styleUrls: ['./debug.component.scss']
})
export class DebugComponent implements OnInit {
    selectedValue: string = '';
    debugParseData = {
        type: 'proxied',
        title: '178: Building C# with Mads Torgersen',
        image:
            'https://assets.fireside.fm/file/fireside-images/podcasts/images/0/02d84890-e58d-43eb-ab4c-26bcc8524289/cover_medium.jpg?v=0',
        description:
            'James sits down with the legendary Mads Torgersen to talk about how the team at Microsoft builds C# and works with the community to plan out and iterate on new features.',
        data: [
            {
                key: 'Download',
                value:
                    'https://chtbl.com/track/84EGD/aphid.fireside.fm/d/1437767933/02d84890-e58d-43eb-ab4c-26bcc8524289/1d5f5dab-5651-4834-8dbc-72cc798626c4.mp3'
            },
            {
                key: 'Download(44.9MB)',
                value:
                    'https://chtbl.com/track/84EGD/aphid.fireside.fm/d/1437767933/02d84890-e58d-43eb-ab4c-26bcc8524289/1d5f5dab-5651-4834-8dbc-72cc798626c4.mp3'
            },
            {
                key: 'DownloadMP3(44.9MB)',
                value:
                    'https://chtbl.com/track/84EGD/aphid.fireside.fm/d/1437767933/02d84890-e58d-43eb-ab4c-26bcc8524289/1d5f5dab-5651-4834-8dbc-72cc798626c4.mp3'
            },
            {
                key: '1d5f5dab-5651-4834-8dbc-72cc798626c4.mp3',
                value:
                    'https://media.fireside.fm/file/fireside-audio/podcasts/audio/0/02d84890-e58d-43eb-ab4c-26bcc8524289/episodes/1/1d5f5dab-5651-4834-8dbc-72cc798626c4/1d5f5dab-5651-4834-8dbc-72cc798626c4.mp3'
            }
        ]
    };

    @ViewChild('player', { static: true })
    player: ElementRef;

    podcastEntryToProcessId: string = '';
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
        private http: HttpClient,
        private utilityService: UtilityService,
        private jobService: JobService,
        private waveformService: WaveformService,
        private scriptService: ScriptService
    ) {}

    ngOnInit() {}
    showPlayer() {}
    selectedUrl(url) {
        alert(url);
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
    debuggle() {
        this.utilityService
            .checkAudioUrl('https://www.rte.ie/radio1/liveline/podcasts/')
            .subscribe(r => console.log('debug.component', 'debuggle', r));
    }
    submitProcessPodcastJob() {
        console.log(
            'debug.component',
            'submitProcessPodcastJob',
            this.podcastEntryToProcessId
        );
        this.jobService
            .processPodcast(this.podcastEntryToProcessId)
            .subscribe(r => console.log('debug.component', 'result', r));
    }
}
