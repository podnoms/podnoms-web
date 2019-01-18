import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingTablesComponent } from './pricing-tables/pricing-tables.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { MakePaymentComponent } from './make-payment/make-payment.component';

@NgModule({
    declarations: [PricingTablesComponent, MakePaymentComponent],
    imports: [CommonModule, PaymentsRoutingModule]
})
export class PaymentsModule {}
