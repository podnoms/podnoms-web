import { Component, OnInit } from '@angular/core';
import { AudioService } from 'app/services/audio.service';

declare var $;

@Component({
    selector: 'app-footer-player',
    templateUrl: './footer-player.component.html',
    styleUrls: ['./footer-player.component.css']
})
export class FooterPlayerComponent implements OnInit {
    title: string;
    duration: number = 0;
    volume: number = 0;
    position: number = 0;
    playState: number = 0;

    constructor(private _audioService: AudioService) {}

    ngOnInit() {
        this._audioService.positionChanged.subscribe(
            (p) => (this.position = p)
        );
        this._audioService.titleChanged.subscribe((t) => (this.title = t));
        this._audioService.durationChanged.subscribe(
            (d) => (this.duration = d)
        );
        this._audioService.volumeChanged.subscribe((v) => (this.volume = v));
        this._audioService.playStateChanged.subscribe(
            (s) => (this.playState = s)
        );

        this._audioService.requestUpdate();
    }
    playPause() {
        this._audioService.toggle();
    }
    doSeek(event) {
        const $bar = $(event.currentTarget);
        const newPercentage =
            (event.pageX - $bar.offset().left) / $bar.width() * 100;

        const pos = newPercentage / 100 * this.duration;
        this._audioService.setPosition(pos);
    }

    setVolume(event) {
        const $bar = $(event.currentTarget);
        const volume = Math.round(
            (event.pageX - $bar.offset().left) / $bar.width() * 100
        );
        this._audioService.setVolume(volume);
    }
}
