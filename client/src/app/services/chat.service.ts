import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { ChatModel } from 'app/models/chat.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChatService extends BaseService {
    constructor(private _http: HttpClient) {
        super();
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
