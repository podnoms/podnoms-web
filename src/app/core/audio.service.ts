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
    inProgress = 0,
    playing = 1,
    paused = 0
}

@Injectable({
    providedIn: 'root'
})
export class AudioService {
    nowPlaying$: BehaviorSubject<NowPlaying> = new BehaviorSubject<NowPlaying>(
        null
    );
    playAudio(
        url: string,
        podcastTitle: string,
        entryTitle: string,
        imageUrl: string
    ) {
        this._playAudio(
            new NowPlaying(url, podcastTitle, entryTitle, imageUrl)
        );
    }
    _playAudio(nowPlaying: NowPlaying) {
        this.nowPlaying$.next(nowPlaying);
    }
}
