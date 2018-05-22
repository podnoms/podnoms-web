import { Component, OnInit } from '@angular/core';
import { AudioService } from '../../../core/audio.service';
declare var $;

@Component({
    selector: 'app-footer-player',
    templateUrl: './footer-player.component.html',
    styleUrls: ['./footer-player.component.scss']
})
export class FooterPlayerComponent implements OnInit {
    title: string;
    duration: number = 0;
    volume: number = 0;
    position: number = 0;
    playState: number = 0;

    constructor(private audioService: AudioService) {}

    ngOnInit() {
        this.audioService.positionChanged.subscribe(p => (this.position = p));
        this.audioService.titleChanged.subscribe(t => (this.title = t));
        this.audioService.durationChanged.subscribe(d => (this.duration = d));
        this.audioService.volumeChanged.subscribe(v => (this.volume = v));
        this.audioService.playStateChanged.subscribe(s => (this.playState = s));

        this.audioService.requestUpdate();
    }
    playPause() {
        this.audioService.toggle();
    }
    doSeek(event) {
        const $bar = $(event.currentTarget);
        const newPercentage =
            (event.pageX - $bar.offset().left) / $bar.width() * 100;

        const pos = newPercentage / 100 * this.duration;
        this.audioService.setPosition(pos);
    }

    setVolume(event) {
        const $bar = $(event.currentTarget);
        const volume = Math.round(
            (event.pageX - $bar.offset().left) / $bar.width() * 100
        );
        this.audioService.setVolume(volume);
    }
}
