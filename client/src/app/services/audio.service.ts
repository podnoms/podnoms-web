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
    private _title: string;
    private _duration: number;
    private _source: string;
    private _playState: number = -1;
    private _position: number = -1;
    private _volume: number = 50;
    // events
    positionChanged: EventEmitter<number> = new EventEmitter();
    playStateChanged: EventEmitter<number> = new EventEmitter();
    titleChanged: EventEmitter<string> = new EventEmitter();
    durationChanged: EventEmitter<number> = new EventEmitter();
    volumeChanged: EventEmitter<number> = new EventEmitter();

    constructor() {
        const previousState = JSON.parse(localStorage.getItem('audio_state'));
        if (previousState) {
            this._title = previousState.title;
            this._source = previousState.source;
            this._duration = previousState.duration;
            this._position = previousState.position;
            this._volume = previousState.volume;
            this._playState = 0;

            this._initialiseAudio(this._source, this._title);
            this._audio.seek(this._position);
            setTimeout(() => this._postEvents(), 1000);
        }
    }
    _initialiseAudio(source: string, title: any): any {
        this._audio = new Howl({
            src: [source],
            html5: true,
            volume: this._volume / 100,
            onplay: (id, pos) => {
                console.log('onplay', id, pos);
                this._playState = 1;
                this._duration = this._audio.duration();
                this.playTimer = Observable.timer(0, 10).subscribe((r) => {
                    this._position = this._audio.seek();
                    this._postEvents();
                    if (r % 1000 === 0) {
                        this._saveState();
                    }
                });
            }
        });
        this._audio.on('end', () => {
            this._playState = 0;
            this.playStateChanged.emit(this._playState);
            this.playTimer.unsubscribe();
        });
    }
    private _saveState() {
        const state = {
            source: this._source,
            title: this._title,
            duration: this._duration,
            playState: this._playState,
            position: this._position,
            volume: this._volume
        };
        localStorage.setItem('audio_state', JSON.stringify(state));
    }
    private _postEvents() {
        this.positionChanged.emit(this._position);
        this.playStateChanged.emit(this._playState);
        this.titleChanged.emit(this._title);
        this.volumeChanged.emit(this._volume);

        this.durationChanged.emit(this._duration);
    }
    requestUpdate() {
        this._postEvents();
    }
    getVolume() {
        return this._volume;
    }
    setVolume(newVolume: number) {
        this._volume = newVolume;
        this._audio.volume(this._volume / 100);
        this._saveState();
    }
    playAudio(source: string, title: string) {
        this._source = source;
        this._title = title;
        if (this._audio && this._audio.playing()) {
            this._audio.stop();
            this.playTimer.unsubscribe();
        }
        this._initialiseAudio(source, title);
        this._audio.once('load', () => this._audio.play());
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
