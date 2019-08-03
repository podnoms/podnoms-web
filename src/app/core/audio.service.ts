import {
    timer as observableTimer,
    Subscription,
    Observable,
    BehaviorSubject
} from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { Howl } from 'howler';
import { NowPlaying } from './model/now-playing';

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
    playState$ = new BehaviorSubject<PlayState>(PlayState.none);
    nowPlaying$ = new BehaviorSubject<NowPlaying>(null);
    playAudio(nowPlaying: NowPlaying) {
        this.nowPlaying$.next(nowPlaying);
        this.playState$.next(PlayState.loading);
    }
    pauseAudio() {
        console.log('audio.service', 'pauseAudio');
        this.playState$.next(PlayState.paused);
    }
    stopAudio() {
        console.log('audio.service', 'stopAudio');
        this.nowPlaying$.next(new NowPlaying(null, null));
        this.playState$.next(PlayState.none);
    }
    audioLoaded() {
        console.log('audio.service', 'audioLoaded');
        this.playState$.next(PlayState.playing);
    }
}
