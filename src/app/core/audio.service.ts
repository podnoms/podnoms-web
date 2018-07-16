import { timer as observableTimer, Subscription, Observable } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { Howl } from 'howler';

export enum PlayState {
    none = -1,
    inProgress = 0,
    playing = 1,
    paused = 0
}

@Injectable({
    providedIn: 'root'
})
export class AudioService {
    private _audio: Howl;
    private _title: string;
    private _duration: number;
    private _source: string;
    private _playState: PlayState = PlayState.none;
    private _position: number = -1;
    private _volume: number = 50;
    private __playTimer: Observable<number> = observableTimer(0, 10);
    // events
    positionChanged: EventEmitter<number> = new EventEmitter();
    playStateChanged: EventEmitter<PlayState> = new EventEmitter();
    titleChanged: EventEmitter<string> = new EventEmitter();
    durationChanged: EventEmitter<number> = new EventEmitter();
    volumeChanged: EventEmitter<number> = new EventEmitter();
    _playTimerSubscription: Subscription;

    constructor() {
        const previousState = JSON.parse(localStorage.getItem('audio_state'));
        if (previousState) {
            this._title = previousState.title;
            this._source = previousState.source;
            this._duration = previousState.duration;
            this._position = previousState.position;
            this._volume = previousState.volume;
            this._playState = PlayState.inProgress;

            this._initialiseAudio(this._source, this._title);
            this._audio.seek(this._position);
            setTimeout(() => {
                this._postEvents();
                this.playStateChanged.emit(this._playState);
            }, 1000); // let everyone know what's what!
        }
    }
    _timedEvents(r: number) {
        console.log('audio.service', '_timedEvents', r);
        this._position = this._audio.seek();
        this._postEvents();
        if (r % 1000 === 0) {
            this._saveState();
        }
    }
    _initialiseAudio(source: string, title: any): any {
        this._audio = new Howl({
            src: [source],
            html5: true,
            volume: this._volume / 100,
            onplay: (id, pos) => {
                console.log('onplay', id, pos);
                this._playState = PlayState.playing;
                this._duration = this._audio.duration();
                this._playTimerSubscription = this.__playTimer.subscribe(r =>
                    this._timedEvents(r)
                );
            }
        });
        this._audio.on('end', () => {
            this._playState = PlayState.inProgress;
            this.playStateChanged.emit(this._playState);
            this._playTimerSubscription.unsubscribe();
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
        this.titleChanged.emit(this._title);
        this.volumeChanged.emit(this._volume);

        this.durationChanged.emit(this._duration);
    }
    closePlayer() {
        this._audio.stop();
        this._playState = PlayState.none;
        this.playStateChanged.emit(this._playState);
        this._playTimerSubscription.unsubscribe();
        localStorage.removeItem('audio_state');
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
            this._playTimerSubscription.unsubscribe();
        }
        this._initialiseAudio(source, title);
        this._audio.once('load', () => this._audio.play());
    }
    toggle() {
        if (this._audio.playing()) {
            this._audio.pause();
            this._playState = PlayState.paused;
            this.playStateChanged.emit(this._playState);
            this._playTimerSubscription.unsubscribe();
        } else {
            this._audio.play();
            this._playState = PlayState.playing;
            this.playStateChanged.emit(this._playState);
        }
    }
    pauseAudio() {
        if (!this._audio.paused) {
            this._audio.pause();
            this._playState = PlayState.paused;
            this.playStateChanged.emit(this._playState);
        }
    }
    setPosition(position) {
        this._audio.seek(position);
    }
}
