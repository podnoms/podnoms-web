declare const Pusher: any;
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/Rx';
import {List} from 'immutable';
import {AuthService} from './auth.service'

@Injectable()
export class PusherService {
    private _pusher: any;
    private _userChannel: any;

    constructor(private _auth: AuthService) {
        console.log('PusherService', 'constructor');
        Pusher.log = function (message) {
            if (window.console && window.console.log) {
                window.console.log(message);
            }
        };
        this._pusher = new Pusher('80e33149d1e70ae7907a', {
            cluster: 'eu',
            encrypted: true
        });
        this._pusher.logToConsole = true;
/*
        this._auth.authenticated(p => {
            if (p) {
                this._userChannel = this._pusher.subscribe(p['uid'] + '_user_channel');
            }
        });
*/
    }

    subscribeMessage(channel: String, message: String, callback) {
        this._pusher.subscribe(channel)
            .bind(message, callback);
    }
}

export class AudioProcessedResult {
    public id: string;
    public status: string;
    public description: string;
    public guess: number;
    public total: number;
    public current: number;

    static fromJson(json: any) {
        return new AudioProcessedResult(
            json.uid, json.status, json.description, json.guess, json.total, json.current
        );
    }

    constructor(id: string, status: string, description: string, guess: number, total: number, current: number) {
        this.id = id;
        this.status = status;
        this.description = description;
        this.guess = guess;
        this.total = total;
        this.current = current;
    }
}
