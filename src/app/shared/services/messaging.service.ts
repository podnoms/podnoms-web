// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { AngularFireDatabase } from '@angular/fire/compat/database';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { AngularFireMessaging } from '@angular/fire/compat/messaging';
// import { take } from 'rxjs/operators';

// @Injectable({
//     providedIn: 'root',
// })
// export class MessagingService {
//     currentMessage = new BehaviorSubject(null);

//     constructor(
//         private angularFireDB: AngularFireDatabase,
//         private angularFireAuth: AngularFireAuth,
//         private angularFireMessaging: AngularFireMessaging
//     ) {
//         this.angularFireMessaging.messaging.subscribe((_messaging) => {
//             _messaging.onMessage = _messaging.onMessage.bind(_messaging);
//             _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(
//                 _messaging
//             );
//         });
//     }

//     /**
//      * update token in firebase database
//      *
//      * @param userId userId as a key
//      * @param token token as a value
//      */
//     updateToken(userId: string, token: string) {
//         // we can change this function to request our backend service
//         this.angularFireAuth.authState.pipe(take(1)).subscribe(() => {
//             const data: any = {};
//             data[userId] = token;
//             this.angularFireDB.object('fcmTokens/').update(data);
//         });
//     }

//     /**
//      * request permission for notification from firebase cloud messaging
//      *
//      * @param userId userId
//      */
//     requestPermission(userId: string) {
//         this.angularFireMessaging.requestToken.subscribe(
//             (token) => {
//                 this.logger.debug(token);
//                 this.updateToken(userId, token);
//             },
//             (err) => {
//                 this.logger.error('Unable to get permission to notify.', err);
//             }
//         );
//     }

//     /**
//      * hook method when new notification received in foreground
//      */
//     receiveMessage() {
//         this.angularFireMessaging.messages.subscribe((payload) => {
//             this.logger.debug('new message received. ', payload);
//             this.currentMessage.next(payload);
//         });
//     }
// }
