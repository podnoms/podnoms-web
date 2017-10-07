import { PodcastEntryModel } from 'app/models/podcasts.models';
import { UpdateAction } from './../actions/entries.actions';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'app/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HubConnection } from '@aspnet/signalr-client';

import * as entryActions from 'app/actions/entries.actions';

@Injectable()
export class NewsService {

    private _hubConnection: HubConnection;

    constructor(private _store: Store<ApplicationState>) {
        this.init();
    }

    public joinGroup(group: string): void {
        this._hubConnection.invoke('JoinGroup', group);
    }

    public leaveGroup(group: string): void {
        this._hubConnection.invoke('LeaveGroup', group);
    }

    private init() {

        this._hubConnection = new HubConnection('/audioprocessing');
        this._hubConnection.on('Send', (item: PodcastEntryModel) => {
            debugger;
            this._store.dispatch(new entryActions.UpdateAction(item));
        });

        /*        
                        this._hubConnection.on('JoinGroup', (data: string) => {
                            this.store.dispatch(new NewsActions.ReceivedGroupJoinedAction(data));
                        });
                
                        this._hubConnection.on('LeaveGroup', (data: string) => {
                            this.store.dispatch(new NewsActions.ReceivedGroupLeftAction(data));
                        });
                */
        this._hubConnection.start()
            .then(() => {
                console.log('Hub connection started')
            })
            .catch(err => {
                console.log('Error while establishing connection')
            });
    }
}
