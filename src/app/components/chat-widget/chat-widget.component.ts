import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ProfileService } from '../../services/profile.service';
import { FirebaseUser } from '../../models/firebaseuser.model';

interface ChatMessage {
    messageText: string;
    name: string;
    fromUser: string;
}
@Component({
    selector: 'app-chat-widget',
    templateUrl: './chat-widget.component.html',
    styleUrls: ['./chat-widget.component.css']
})
export class ChatWidgetComponent implements OnInit {
    chatActive: boolean = false;
    loading: boolean = false;
    currentUser: FirebaseUser;

    messageCollection: AngularFirestoreCollection<ChatMessage>;
    messages: Observable<ChatMessage[]>;
    userName: string = 'Anonymous User';
    constructor(
        private _firebaseAuthService: FirebaseAuthService,
        private _profileService: ProfileService,
        private afs: AngularFirestore
    ) {
        this._profileService
            .getProfile()
            .subscribe((p) => (this.userName = p.firstName + ' ' + p.lastName));
    }

    ngOnInit() {}

    togglePopup() {
        this.chatActive = !this.chatActive;
        if (this.chatActive) {
            this.loading = true;
            this._firebaseAuthService.user.subscribe((u) => {
                if (u === null) {
                    this._firebaseAuthService
                        .anonymousLogin()
                        .then((user) => this._openChat(user));
                } else {
                    this._openChat(u);
                }
            });
        }
    }
    _openChat(user) {
        this.currentUser = user;
        this.loading = false;
        this.messageCollection = this.afs.collection('supportchat');
        this.messages = this.messageCollection.valueChanges();
    }

    sendMessage(el: HTMLInputElement) {
        if (el.value) {
            this.afs
                .collection('supportchat')
                .add({
                    fromUid: this.currentUser.uid,
                    messageText: el.value,
                    name: this.currentUser.displayName
                });
        }
    }
}
