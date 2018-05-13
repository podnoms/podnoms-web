import { Component, ViewChild, ElementRef } from '@angular/core';
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
export class ChatWidgetComponent {
    chatActive: boolean = false;
    private user: ProfileModel;
    messages$: Observable<ChatModel[]>;
    private messageEl: ElementRef;

    // have to handle ViewChild like this as it's hidden with ngIf
    @ViewChild('message')
    set content(content: ElementRef) {
        this.messageEl = content;
    }

    constructor(
        private _profileService: ProfileService,
        private _signalRService: SignalRService,
        private _store: Store<ApplicationState>
    ) {
        this._profileService.getProfile().subscribe((p) => (this.user = p));
        this.messages$ = _store.select(fromChat.getChat);
        this.messages$.subscribe((r) => {
            if (r.length != 0) {
                this.chatActive = true;
            }
        });
    }

    togglePopup() {
        this.chatActive = !this.chatActive;
        if (this.chatActive) {
            setTimeout(() => this.messageEl.nativeElement.focus(), 0);
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
