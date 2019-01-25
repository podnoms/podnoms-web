import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingTablesComponent } from './pricing-tables/pricing-tables.component';
import { PaymentsRoutingModule } from './payments-routing.module';
import { MakePaymentComponent } from './make-payment/make-payment.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { SharedModule } from '../shared/shared.module';
import { ScriptService } from '../core/scripts/script.service';

@NgModule({
    declarations: [PricingTablesComponent, MakePaymentComponent, PaymentListComponent],
    imports: [CommonModule, FormsModule, DataTablesModule, SharedModule, PaymentsRoutingModule],
    providers: [ScriptService]
})
export class PaymentsModule {}
