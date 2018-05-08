import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import {
    AngularFirestore,
    AngularFirestoreDocument
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { FirebaseUser } from 'app/models/firebaseuser.model';

@Injectable()
export class FirebaseAuthService {
    user: Observable<FirebaseUser | null>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore
    ) {
        this.user = this.afAuth.authState.switchMap((user) => {
            if (user) {
                return this.afs
                    .doc<FirebaseUser>(`users/${user.uid}`)
                    .valueChanges();
            } else {
                return Observable.of(null);
            }
        });
    }

    private handleError(error: Error) {
        console.error(error);
    }

    private updateUserData(user: FirebaseUser): Promise<FirebaseUser> {
        const userRef: AngularFirestoreDocument<FirebaseUser> = this.afs.doc(
            `users/${user.uid}`
        );
        const data: FirebaseUser = {
            uid: user.uid,
            email: user.email || null,
            displayName: user.displayName || 'nameless user',
            photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ'
        };
        return userRef.set(data).then(() => data);
    }
    anonymousLogin() {
        return this.afAuth.auth
            .signInAnonymously()
            .then((user) => {
                return this.updateUserData(user); // if using firestore
            })
            .catch((error) => {
                console.error(error.code);
                console.error(error.message);
                this.handleError(error);
            });
    }
}
