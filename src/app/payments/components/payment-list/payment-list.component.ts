import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Payment } from '../../../core';
import { Observable } from 'rxjs';
import { ProfileDataService } from '../../../profile/profile-data.service';
import { PaymentsService } from '../../payments.service';

@Component({
    selector: 'app-payment-list',
    templateUrl: './payment-list.component.html',
    styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
    @ViewChild('downloader')
    downloader: ElementRef;

    constructor(private profileDataService: ProfileDataService, private paymentService: PaymentsService) {}
    payments$: Observable<Payment[]>;

    ngOnInit() {
        this.getPayments();
    }

    getPayments() {
        this.payments$ = this.paymentService.getPayments();
    }
    downloadInvoice(payment: Payment) {
        const anchor: HTMLAnchorElement = document.createElement('a');
        anchor.href = payment.receiptURL;
        anchor.download = payment.receiptURL;
        anchor.target = '_blank';

        document.body.appendChild(anchor);
        anchor.click();
        // this.downloader.nativeElement.src = url;
        // this.paymentService.downloadInvoice(payment.id).subscribe(p => {
        //     console.log('payment-list.component', 'downloadInovice', p);
        //     const downloadUrl = window.URL.createObjectURL(
        //         new Blob([this['response']], {
        //             type: 'text/html'
        //         })
        //     );
        //     const link = document.createElement('A');
        //     link.setAttribute('href', downloadUrl);
        //     link.setAttribute('download', `$PodNoms Invoice.html`);
        //     link.appendChild(document.createTextNode('Download'));
        //     document.getElementsByTagName('body')[0].appendChild(link);

        //     link.click();
        // });
    }
}
