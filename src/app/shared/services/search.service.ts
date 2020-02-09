import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    constructor(private httpClient: HttpClient) {}

    doSearch(text): Observable<any> {
        const url = environment.apiHost + `/search/${text}`;
        return this.httpClient.get<any>(url);
    }
}
