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
import { PaymentsService } from '../payments.service';
import { environment } from '../../../environments/environment';
import { AlertService } from '../../core/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ScriptService } from '../../core/scripts/script.service';
import { AuthService } from '../../auth/auth.service';
declare var StripeCheckout: any;

@Component({
    selector: 'app-make-payment',
    templateUrl: './make-payment.component.html',
    styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements AfterViewInit, OnInit {
    loadingText: string = 'Loading payment methods';
    headerText: string = '';
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
        private authService: AuthService,
        private scriptService: ScriptService,
        private paymentService: PaymentsService,
        private alertService: AlertService
    ) {}
    ngOnInit() {
        this.type = this.route.snapshot.params.type || 'advanced';
        switch (this.type) {
            case 'donation':
                this.headerText = 'Buy me a coffee, or a beer, or an Aston Martin';
                break;
            case 'advanced':
                this.headerText = 'Purchase 1 month advanced subscription';
                break;
            case 'professional':
                this.headerText = 'Purchase 1 month professional subscription';
                break;
        }
        this.amount = (this.type === 'advanced' ? 10 : this.type === 'professional' ? 100 : 0) * 100;
        this.scriptService
            .load('stripe')
            .then(() => {
                this.handler = StripeCheckout.configure({
                    key: environment.stripeKey,
                    image: 'https://www.podnoms.com/assets/img/logo-icon.png',
                    locale: 'auto',
                    token: (token: { id: any }) => {
                        this.loadingText = 'Processing payment';
                        this.paymentService.processPayment(token.id, this.amount, this.type).subscribe(
                            r => {
                                if (r) {
                                    this.authService.reloadProfile().subscribe(() => {
                                        this.alertService.success(
                                            'Success',
                                            this.type === 'donation'
                                                ? 'THANK YOU SO MUCH!!!!'
                                                : 'Payment successfully received.'
                                        );
                                        this.router.navigate(['']);
                                    });
                                }
                            },
                            error =>
                                (this.loadingText =
                                    'There was an error processing your payment, please refresh and try again')
                        );
                    }
                });
                this.loadingText = '';
            })
            .catch(err => console.error('make-payment.component', 'Error loading stripe', err));
    }
    handlePayment() {
        this.handler.open({
            name: 'PodNoms',
            description: this.label,
            amount: this.amount
        });
    }
    handleDonation(amount) {
        this.amount = amount * 100;
        console.log('make-payment.component', 'handleDonation', amount);
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
