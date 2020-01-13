import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AppActions from './actions';
import { AppState } from './reducer';

@Injectable()
export class AppDispatchers {
    constructor(private store: Store<AppState>) {}

    clearAllStorage() {
        this.store.dispatch(new AppActions.ClearAllState());
    }
}
