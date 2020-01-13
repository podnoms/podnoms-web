import { Component, OnInit } from '@angular/core';
import { AudioService } from 'app/core/audio.service';
import { NowPlaying } from 'app/core/model/now-playing';
import { PodcastEntry } from 'app/core';
import { Howl } from 'howler';
import { environment } from 'environments/environment';
import { Observable, interval, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-header-player',
    templateUrl: './header-player.component.html',
    styleUrls: ['./header-player.component.scss']
})
export class HeaderPlayerComponent implements OnInit {
    title: string = '';
    available: boolean = false;
    isPlaying: boolean = false;
    isLoading: boolean = false;
    sound = new Howl({
        src: [`${environment.radioHost}/${environment.radioMount}`],
        html5: true,
        onplay: () => {
            this.isPlaying = true;
            this.isLoading = false;
        },
        onloaderror: () => (this.isLoading = false)
    });
    constructor(private audioService: AudioService, private http: HttpClient) {}

    getStreamDetails(): Observable<any> {
        const host = `${environment.radioHost}/status-json.xsl?mount=/${environment.radioMount}`;
        const statusUrl = `${environment.apiHost}/pub/radio/nowplaying?url=${host}`;
        return this.http
            .get(statusUrl, { responseType: 'text' })
            .pipe(tap(r => (this.available = r)));
    }

    ngOnInit() {
        this.getStreamDetails().subscribe(r => (this.title = r));
        if (environment.production) {
            setInterval(
                () => this.getStreamDetails().subscribe(r => (this.title = r)),
                60000
            );
        }
    }

    playAudio() {
        this.audioService.stopAudio();
        if (!this.isPlaying) {
            this.isLoading = true;
            this.isPlaying = false;

            this.sound.play();
        } else {
            this.sound.stop();
        }
    }
}
