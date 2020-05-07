import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
    providedIn: 'root'
})
export class PaymentsService {
    constructor(private http: HttpClient, protected logger: NGXLogger) {}

    getPayments(): Observable<Payment[]> {
        return this.http.get<Payment[]>(environment.apiHost + '/payments');
    }
    getPricingTiers(): Observable<any> {
        return this.http.get<any>(
            environment.apiHost + '/payments/pricingtiers'
        );
    }
    getPricingTier(type: string): Observable<any> {
        return this.http.get<any>(
            `${environment.apiHost}/payments/pricingtier/${type}`
        );
    }
    processPayment(
        token: any,
        amount: number,
        type: string
    ): Observable<Boolean> {
        this.logger.info('payments.service', 'processPayment', token, amount);
        const data = JSON.stringify({
            token: token,
            amount: amount,
            type: type
        });
        return this.http
            .post(environment.apiHost + '/payments', data)
            .map(r => r !== undefined);
    }
    downloadInvoice(id: string): Observable<any> {
        return this.http.get<any>(
            `${environment.apiHost}/payments/invoice/${id}`
        );
    }
}
