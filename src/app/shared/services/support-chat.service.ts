import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat } from 'app/core/model/chat';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SupportChatService {
    constructor(private httpClient: HttpClient) {}

    getAdminMessages(): Observable<Chat[]> {
        return this.httpClient.get<Chat[]>(
            `${environment.apiHost}/chat/getadmin`
        );
    }
    initiateSupportRequest(message: Chat): Observable<Chat> {
        return this.httpClient.post<Chat>(
            `${environment.apiHost}/chat/initialise`,
            message
        );
    }
    submitMessage(message: Chat): Observable<Chat> {
        return this.httpClient.post<Chat>(
            `${environment.apiHost}/chat`,
            message
        );
    }
}
