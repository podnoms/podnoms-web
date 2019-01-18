import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PaymentsService {
    stripe = Stripe('pk_test_mGinslLydr5VhY65rgHu3hw7'); // use your test publishable key
    elements = this.stripe.elements();
    constructor() {}
}
