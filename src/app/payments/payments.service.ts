import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PaymentsService {
    constructor(private http: HttpClient) {}

    processPayment(token: any, amount: number, type: string): Observable<Boolean> {
        console.log('payments.service', 'processPayment', token, amount);
        const data = JSON.stringify({ token: token, amount: amount, type: type });
        return this.http.post(environment.apiHost + '/payments', data).map(r => r !== undefined);
    }
}
