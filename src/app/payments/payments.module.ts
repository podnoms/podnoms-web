import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingTablesComponent } from './pricing-tables/pricing-tables.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [PricingTablesComponent, MakePaymentComponent],
    imports: [CommonModule, FormsModule, PaymentsRoutingModule]
})
export class PaymentsModule {}
