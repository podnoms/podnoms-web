import {
    Component,
    AfterViewInit,
    OnDestroy,
    ViewChild,
    ElementRef,
    ChangeDetectorRef,
    OnInit,
    HostListener
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentsService } from '../payments.service';
import { environment } from '../../../environments/environment';
import { AlertService } from '../../core/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var StripeCheckout: any;

@Component({
    selector: 'app-make-payment',
    templateUrl: './make-payment.component.html',
    styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements AfterViewInit, OnInit {
    @ViewChild('payElement') payElement: ElementRef;

    handler: any;
    error: string;
    amount: number = 10 * 100;
    label: string = 'PodNoms Monthly *Advanced* subscription';
    elements: any;
    paymentRequest: any;
    prButton: any;
    type: string;
    constructor(
        private cd: ChangeDetectorRef,
        private router: Router,
        private route: ActivatedRoute,
        private paymentService: PaymentsService,
        private alertService: AlertService
    ) {}
    ngOnInit() {
        this.type = this.route.snapshot.params.type || 'advanced';
        this.handler = StripeCheckout.configure({
            key: environment.stripeKey,
            image: 'https://www.podnoms.com/assets/img/logo-icon.png',
            locale: 'auto',
            token: token => {
                this.paymentService.processPayment(token.id, this.amount, this.type).subscribe(r => {
                    if (r) {
                        this.alertService.success('Success', 'Payment successfully received.');
                        this.router.navigate(['']);
                    }
                });
            }
        });
    }
    handlePayment() {
        this.handler.open({
            name: 'PodNoms',
            description: this.label,
            amount: this.amount
        });
    }
    ngAfterViewInit() {}

    @HostListener('window:popstate')
    onpopstate() {
        this.handler.close();
    }
}
