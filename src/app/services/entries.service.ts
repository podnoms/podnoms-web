import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EntriesService {
    constructor(private http: HttpClient) {}

    get(): Observable<any> {
        return this.http.get('https://api.com');
    }
}
