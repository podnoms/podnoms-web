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
    constructor() {}

    ngOnInit() {}
}
