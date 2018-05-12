import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { ChatModel } from 'app/models/chat.model';
import { HttpClient } from '@angular/common/http';
import { SignalRService } from './signalr.service';
import { Subject } from 'rxjs';
import * as fromChat from 'app/reducers';
import * as fromChatActions from 'app/actions/chat.actions';
import { ApplicationState } from '../store';
import { Store } from '@ngrx/store';
import { debug } from 'util';
import { PodnomsAuthService } from './podnoms-auth.service';

@Injectable()
export class ChatService extends BaseService {
    constructor(
        private _http: HttpClient,
        private _signalRService: SignalRService,
        private _store: Store<ApplicationState>,
        private _authService: PodnomsAuthService
    ) {
        super();
        this._authService.authNavStatus$.subscribe((r) => {
            if (r) {
                this._signalRService.init('chat').then((listener) => {
                    listener
                        .on<ChatModel>('chat', 'SendMessage')
                        .subscribe((message: ChatModel) => {
                            console.log(
                                'chat-widget.component',
                                'SendMessage',
                                message
                            );
                            this._store.dispatch(
                                new fromChatActions.ReceiveAction(message)
                            );
                        });
                });
            }
        });
    }

    get(): Observable<ChatModel[]> {
        return this._http.get<ChatModel[]>(environment.API_HOST + '/chat/');
    }

    send(item: ChatModel): Observable<ChatModel> {
        return this._http.post<ChatModel>(
            environment.API_HOST + '/chat/',
            item
        );
    }
}
