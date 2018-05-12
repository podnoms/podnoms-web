import { ProfileModel } from './../models/profile.model';
import { Action } from '@ngrx/store';
import { ChatModel } from '../models/chat.model';
//#region Load
export const LOAD = '[Chat] Load';
export const LOAD_SUCCESS = '[Chat] Load Success';
export const LOAD_FAIL = '[Chat] Load Fail';
export class LoadAction implements Action {
    readonly type = LOAD;
    constructor() {}
}
export class LoadSuccessAction implements Action {
    readonly type = LOAD_SUCCESS;
    constructor(public payload: ChatModel[]) {}
}
export class LoadFailAction implements Action {
    readonly type = LOAD_FAIL;
    constructor(public payload: any) {}
}
//#region Add
export const ADD = '[Chat] Add Chat';
export const ADD_SUCCESS = '[Chat] Add Chat Success';
export const ADD_FAIL = '[Chat] Add Chat Fail';
export class AddAction implements Action {
    readonly type = ADD;
    constructor(public payload: ChatModel) {}
}
export class AddSuccessAction implements Action {
    readonly type = ADD_SUCCESS;
    constructor(public payload: ChatModel) {}
}
//#endregion
//#region Add
// the receive action is for messages from signalR
// we don't want to initiate a POST to the server.
export const RECEIVE = '[Chat] Receive Chat';
export const RECEIVE_SUCCESS = '[Chat] Receive Chat Success';
export const RECEIVE_FAIL = '[Chat] Receive Chat Fail';
export class ReceiveAction implements Action {
    readonly type = RECEIVE;
    constructor(public payload: ChatModel) {
        console.log('chat.actions', 'RECEIVE', payload);
    }
}
export class ReceiveSuccessAction implements Action {
    readonly type = RECEIVE_SUCCESS;
    constructor(public payload: ChatModel) {
        console.log('chat.actions', 'RECEIVE_SUCESS', payload);
    }
}
//#endregion
export type Actions =
    | LoadAction
    | LoadSuccessAction
    | LoadFailAction
    | AddAction
    | AddSuccessAction
    | ReceiveAction
    | ReceiveSuccessAction;
