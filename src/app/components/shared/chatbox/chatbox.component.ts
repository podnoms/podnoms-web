import {
    Component,
    OnInit,
    ViewChild,
    AfterViewInit,
    ElementRef,
    ChangeDetectorRef,
    OnChanges
} from '@angular/core';
import { SupportChatService } from 'app/shared/services/support-chat.service';
import { Chat } from 'app/core/model/chat';
import { ProfileDataService } from 'app/profile/profile-data.service';
import { Observable } from 'rxjs';
import { Profile } from 'app/core';
import { SignalRService } from 'app/shared/services/signal-r.service';
import { AlertService } from 'app/core/alerts/alert.service';
import {
    PerfectScrollbarConfigInterface,
    PerfectScrollbarComponent,
    PerfectScrollbarDirective
} from 'ngx-perfect-scrollbar';
import { NGXLogger } from 'ngx-logger';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-chatbox',
    templateUrl: './chatbox.component.html',
    styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit, AfterViewInit, OnChanges {
    anonName: string = '';
    anonEmail: string = '';
    currentMessage: string = '';
    showing: boolean = false;
    profile: Profile;
    toUserId: string = '';
    messages = {};

    handshake: boolean = false;
    @ViewChild('messageList') messageList: PerfectScrollbarDirective;

    public scrollConfig: PerfectScrollbarConfigInterface = {};

    constructor(
        private cdRef: ChangeDetectorRef,
        private chatService: SupportChatService,
        private signalr: SignalRService,
        private alertService: AlertService,
        private profileService: ProfileDataService,
        private logger: NGXLogger
    ) {}
    ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
        if (changes) {
            this.messageList.scrollToBottom(0, 300);
        }
    }

    ngOnInit(): void {
        this.profileService.getProfile().subscribe(p => {
            this.profile = p && p[0];
        });
        this.signalr
            .init('chat')
            .then(listener => {
                listener
                    .on<Chat>('chat', 'support-message')
                    .subscribe(result => {
                        this.toUserId = result.fromUserId;
                        this._addMessage(result);
                        this.showing = true;
                    });
            })
            .catch(err => {
                this.logger.error(
                    'app.component',
                    'Unable to initialise site update hub',
                    err
                );
            });
    }
    ngAfterViewInit() {}
    toggleChat() {
        this.showing = !this.showing;
        if (this.showing) {
            this.cdRef.detectChanges();
            setTimeout(() => {
                if (this.profile) {
                    this.chatService
                        .getAdminMessages()
                        .pipe(
                            map(r =>
                                r.map(message => this._addMessage(message))
                            )
                        )
                        .subscribe(r => {
                            this.logger.info(
                                'chatbox.component',
                                this.messageList
                            );
                            this.messageList.scrollToBottom(0, 300);
                            this.logger.info(
                                'chatbox.component',
                                'getAdminMessages',
                                r
                            );
                        });
                }
            });
        } else {
            this.messages = {};
        }
    }
    submitMessage() {
        const chat = new Chat(
            this.toUserId ?? '',
            this.profile?.id ?? this.anonName,
            this.profile?.name ?? this.anonName,
            this.currentMessage
        );
        if (!this.toUserId) {
            this._initiateSupportRequest(chat);
        } else {
            this._postChat(chat);
        }
    }
    private _initiateSupportRequest(chat: Chat) {
        this.chatService.initiateSupportRequest(chat).subscribe(result => {
            this.handshake = true;
            this.toUserId = result.toUserId;
            this.currentMessage = '';
            this._addMessage(result);
        });
    }
    private _postChat(chat: Chat) {
        this.chatService.submitMessage(chat).subscribe(result => {
            this.currentMessage = '';
            this._addMessage(result);
        });
    }
    private _addMessage(message: Chat) {
        this.messages[message.messageId] = message;
        const keys = [];

        // tslint:disable-next-line: forin
        for (const key in this.messages) {
            keys[keys.length] = key;
        }

        const values: Array<Chat> = [];
        for (let i = 0; i < keys.length; i++) {
            values[values.length] = this.messages[keys[i]];
        }

        this.messages = values.sort((x, y) =>
            x.messageDate < y.messageDate
                ? -1
                : x.messageDate > y.messageDate
                ? 1
                : 0
        );
        this.cdRef.detectChanges();
        setTimeout(() => {
            this.messageList.scrollToBottom(0, 100);
        });
    }
}
