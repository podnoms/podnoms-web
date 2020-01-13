import { Component, OnInit } from '@angular/core';
import { PaymentsService } from '../payments.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-pricing-tables',
    templateUrl: './pricing-tables.component.html',
    styleUrls: ['./pricing-tables.component.scss']
})
export class PricingTablesComponent implements OnInit {
    constructor(private paymentsService: PaymentsService) {}
    pricingTiers$: Observable<any>;
    ngOnInit() {
        this.pricingTiers$ = this.paymentsService.getPricingTiers();
    }

    startPayment(paymentType: string) {}
}
