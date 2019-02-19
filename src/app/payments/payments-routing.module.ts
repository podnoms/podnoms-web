import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.guard';
import { PricingTablesComponent } from './pricing-tables/pricing-tables.component';
import { MakePaymentComponent } from './make-payment/make-payment.component';

const routes: Routes = [
    { path: 'pricing', pathMatch: 'full', component: PricingTablesComponent, canActivate: [AuthGuard] },
    { path: 'pay', pathMatch: 'full', component: MakePaymentComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PaymentsRoutingModule {}
