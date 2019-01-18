import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentsService } from '../payments.service';
@Component({
    selector: 'app-make-payment',
    templateUrl: './make-payment.component.html',
    styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements AfterViewInit, OnDestroy {
    @ViewChild('payElement') payElement: ElementRef;
    error: string;
    amount: number = 10;
    label: string = 'PodNoms Monthly *Advanced* subscription';
    elements: any;
    paymentRequest: any;
    prButton: any;

    constructor(private cd: ChangeDetectorRef, private paymentService: PaymentsService) {}

    ngAfterViewInit() {
        this.paymentRequest = this.paymentService.stripe.paymentRequest({
            country: 'IE',
            currency: 'eur',
            total: {
                amount: this.amount,
                label: this.label
            }
        });

        this.elements = this.paymentService.stripe.elements();

        this.paymentRequest.on('source', async event => {
            console.log('make-payment.component', 'paymentRequest', event);

            // TODO: Call the backend API here to handle the payment
            setTimeout(() => {
                event.component('success');
            }, 1000);
        });

        this.prButton = this.elements.create('paymentRequestButton', {
            paymentRequest: this.paymentRequest
        });

        this.mountButton();
    }
    mountButton() {
        this.prButton.mount(this.payElement.nativeElement);
        // this.paymentRequest
        //     .canMakePayment()
        //     .then(r => {
        //         this.prButton.mount(this.payElement.nativeElement);
        //     })
        //     .error(err => console.log('make-payment.component', 'mountButton', 'Unable to create payments form', err));
    }
    ngOnDestroy() {}

    onChange({ error }) {}

    async onSubmit(form: NgForm) {}
}
