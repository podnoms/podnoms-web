import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../../../core/scripts/script.service';
declare var BuyWithCrypto: any;

@Component({
    selector: 'app-donation',
    templateUrl: './donation.component.html',
    styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {
    constructor(private scriptService: ScriptService) {}

    ngOnInit() {
        this.scriptService.load('coinbase').then(() => {
            BuyWithCrypto.registerCallback('onSuccess', e => {
                console.log('donation.component', 'onSuccess', e);
            });
            BuyWithCrypto.registerCallback('onFailure', e => {
                console.log('donation.component', 'onFailure', e);
            });
            BuyWithCrypto.registerCallback('onPaymentDetected', e => {
                console.log('donation.component', 'onPaymentDetected', e);
            });
        });
    }
}
