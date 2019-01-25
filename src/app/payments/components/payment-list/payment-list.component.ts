import { Component, OnInit } from '@angular/core';
import { Payment } from '../../../core';
import { Observable } from 'rxjs';
import { ProfileDataService } from '../../../profile/profile-data.service';

@Component({
    selector: 'app-payment-list',
    templateUrl: './payment-list.component.html',
    styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
    constructor(private profileDataService: ProfileDataService) {}
    payments$: Observable<Payment[]>;

    ngOnInit() {
        this.getPayments();
    }

    getPayments() {
        this.payments$ = this.profileDataService.getPayments();
    }
}
