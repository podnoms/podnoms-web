import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { SignalRService } from '../../services/signalr.service';
import { ProfileModel } from 'app/models/profile.model';
import { ChatService } from 'app/services/chat.service';
import { ChatModel } from 'app/models/chat.model';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/store';

import * as fromChat from 'app/reducers';
import * as fromChatActions from 'app/actions/chat.actions';
import { Observable } from 'rxjs/Observable';
@Component({
    selector: 'app-chat-widget',
    templateUrl: './chat-widget.component.html',
    styleUrls: ['./chat-widget.component.css']
})
export class ChatWidgetComponent implements OnInit {
    chatActive: boolean = false;
    loading: boolean = false;
    user: ProfileModel;
    messages$: Observable<ChatModel[]>;

    constructor(
        private _profileService: ProfileService,
        private _signalRService: SignalRService,
        private _store: Store<ApplicationState>
    ) {
        this._profileService.getProfile().subscribe((p) => (this.user = p));
        this.messages$ = _store.select(fromChat.getChat);
    }

    ngOnInit() {}

    togglePopup() {
        this.chatActive = !this.chatActive;

        if (this.chatActive && this.user) {
            this.loading = true;
            this._signalRService.init('chat').then(() => {
                this.loading = false;
                this._signalRService.connection.on('SendMessage', (message) => {
                    console.log(
                        'chat-widget.component',
                        'SendMessage',
                        message
                    );
                });
            });
        }
    }

    sendMessage(el: HTMLInputElement) {
        const item: ChatModel = {
            message: el.value
        };
        this._store.dispatch(new fromChatActions.AddAction(item));
        el.value = '';
    }
}
