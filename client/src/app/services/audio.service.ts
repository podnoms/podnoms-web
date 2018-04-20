import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Howl } from 'howler';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

export interface AudioStatus {
    title: string;
    duration: number;
    playState: number;
    position: number;
}

@Injectable()
export class AudioService {
    playTimer: Subscription;
    private _audio: Howl;
    private _playState: number = 0;
    private _volume: number = 50;
    // events
    positionChanged: EventEmitter<number> = new EventEmitter();
    playStateChanged: EventEmitter<number> = new EventEmitter();
    titleChanged: EventEmitter<string> = new EventEmitter();
    durationChanged: EventEmitter<number> = new EventEmitter();
    volumeChanged: EventEmitter<number> = new EventEmitter();

    constructor() {
        this._volume = parseInt(localStorage.getItem('audio_volume') || '50', 10);
    }

    private _isPlaying() {
        return (
            this._audio &&
            this._audio.currentTime > 0 &&
            !this._audio.paused &&
            !this._audio.ended &&
            this._audio.readyState > 2
        );
    }
    getVolume() {
        return this._volume;
    }
    setVolume(newVolume: number) {
        this._volume = newVolume;
        this._audio.volume(this._volume / 100);
        localStorage.setItem('audio_volume', String(newVolume));
    }
    playAudio(source: string, title: string) {
        if (this._audio && this._audio.playing()) {
            this._audio.stop();
            this.playTimer.unsubscribe();
        }
        this._audio = new Howl({
            src: [source],
            html5: true,
            volume: this._volume / 100,
            onplay: (id, pos) => {
                console.log('onplay', id, pos);
                this._playState = 1;
                this.playStateChanged.emit(this._playState);
                this.titleChanged.emit(title);
                this.durationChanged.emit(this._audio.duration());
                this.playTimer = Observable.timer(0, 10).subscribe((r) => {
                    this.positionChanged.emit(this._audio.seek());
                    this.playStateChanged.emit(this._playState);
                    this.titleChanged.emit(title);
                    this.durationChanged.emit(this._audio.duration());
                    this.volumeChanged.emit(this._volume);
                });
            }
        });
        this._audio.once('load', () => this._audio.play());
        this._audio.on('end', () => {
            this._playState = 0;
            this.playStateChanged.emit(this._playState);
            this.playTimer.unsubscribe();
        });
    }
    toggle() {
        if (this._audio.playing()) {
            this._audio.pause();
            this._playState = 2;
        } else {
            this._audio.play();
            this._playState = 1;
        }
    }
    pauseAudio() {
        if (!this._audio.paused) {
            this._audio.pause();
            this._playState = 2;
            this.playStateChanged.emit(this._playState);
        }
    }
    setPosition(position) {
        this._audio.seek(position);
    }
}
