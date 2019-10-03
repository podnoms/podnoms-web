import {
    timer as observableTimer,
    Subscription,
    Observable,
    BehaviorSubject
} from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { Howl } from 'howler';
import { NowPlaying } from './model/now-playing';
import { UiStateService } from './ui-state.service';

export enum PlayState {
    none = -1,
    loading = 0,
    playing = 1,
    paused = 0
}

@Injectable({
    providedIn: 'root'
})
export class AudioService {
    constructor(public uiStateService: UiStateService) {}
    private _playState: PlayState = PlayState.none;
    playState$ = new BehaviorSubject<PlayState>(PlayState.none);
    nowPlaying$ = new BehaviorSubject<NowPlaying>(null);
    playAudio(nowPlaying: NowPlaying) {
        if (this._playState !== PlayState.none) {
            this.stopAudio();
            setTimeout(() => this._playInternal(nowPlaying), 500);
        } else {
            this._playInternal(nowPlaying);
        }
    }
    private _playInternal(nowPlaying: NowPlaying) {
        this.nowPlaying$.next(nowPlaying);
        this.playState$.next(PlayState.loading);
    }
    pauseAudio() {
        console.log('audio.service', 'pauseAudio');
        this._playState = PlayState.paused;
        this.playState$.next(this._playState);
    }
    stopAudio() {
        if (this._playState !== PlayState.none) {
            console.log('audio.service', 'stopAudio');
            this._playState = PlayState.none;
            this.playState$.next(this._playState);
            this.uiStateService.setFooterOpen(false);
        }
    }
    audioLoaded() {
        console.log('audio.service', 'audioLoaded');
        this._playState = PlayState.playing;
        this.playState$.next(this._playState);
        this.uiStateService.setFooterOpen(true);
    }
}
