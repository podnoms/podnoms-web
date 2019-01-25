import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingTablesComponent } from './pricing-tables/pricing-tables.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { PaymentListComponent } from './components/payment-list/payment-list.component';

@NgModule({
    declarations: [PricingTablesComponent, MakePaymentComponent, PaymentListComponent],
    imports: [CommonModule, FormsModule, DataTablesModule, PaymentsRoutingModule]
})
export class PaymentsModule {}
