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
    errorText: string = '';
    headerText: string = '';
    handler: any;
    error: string;
    tier: any;
    chargingAmount: number = -1;
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
        const type = this.route.snapshot.params.type || 'advanced';
        switch (type) {
            case 'Free':
                this.headerText = 'Buy me a coffee, or a beer, or an Aston Martin';
                break;
            case 'Personal':
                this.headerText = 'Purchase 1 month advanced subscription';
                break;
            case 'Professional':
                this.headerText = 'Purchase 1 month professional subscription';
                break;
        }

        this.paymentService.getPricingTier(type).subscribe(
            p => {
                this.tier = p;
                this._spinUpMerchant(p);
            },
            err => {
                console.log('make-payment.component', 'getPricingTier', err);
                this.errorText = 'Unable to load pricing tier, please try again later';
            }
        );
    }
    _spinUpMerchant(pricingTier: any) {
        this.scriptService
            .load('stripe')
            .then(() => {
                this.handler = StripeCheckout.configure({
                    key: environment.stripeKey,
                    image: 'https://www.podnoms.com/assets/img/logo-icon.png',
                    locale: 'auto',
                    currency: 'EUR',
                    token: (token: { id: any }) => {
                        this.loadingText = 'Processing payment';
                        this.paymentService.processPayment(token.id, this.chargingAmount, pricingTier.type).subscribe(
                            r => {
                                if (r) {
                                    this.authService.reloadProfile().subscribe(() => {
                                        this.alertService.success(
                                            'Success',
                                            pricingTier.type === 'Free'
                                                ? 'THANK YOU SO MUCH!!!!'
                                                : 'Payment successfully received.'
                                        );
                                        this.router.navigate(['']);
                                    });
                                }
                            },
                            error => {
                                this.loadingText = '';
                                this.errorText =
                                    'There was an error processing your payment, ' +
                                    'please open a ticket at ' +
                                    '<a href="https://talk.podnoms.com/"> PodNoms Support</a> so we can track your payment';
                            }
                        );
                    }
                });
                this.loadingText = '';
            })
            .catch(err => console.error('make-payment.component', 'Error loading stripe', err));
    }
    handlePayment() {
        this.chargingAmount = this.tier.costPerMonth;
        this.handler.open({
            name: 'PodNoms',
            description: this.tier.title,
            amount: this.chargingAmount
        });
    }
    handleDonation(amount) {
        this.chargingAmount = amount * 100;
        console.log('make-payment.component', 'handleDonation', amount);
        this.handler.open({
            name: 'PodNoms',
            description: this.tier.title,
            amount: this.chargingAmount
        });
    }
    ngAfterViewInit() {}

    @HostListener('window:popstate')
    onpopstate() {
        this.handler.close();
    }
}
