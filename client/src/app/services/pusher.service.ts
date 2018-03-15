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
        this._pusher = new Pusher('9f59ab0666214980ef76', {
            cluster: 'eu',
            encrypted: true
        });
        this._pusher.logToConsole = true;
    }

    subscribeMessage(channel: string, message: string, callback) {
        this._pusher.subscribe(channel)
            .bind(message, callback);
    }
}
