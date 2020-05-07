import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../../../core/scripts/script.service';
import { NgxFancyLoggerService } from 'ngx-fancy-logger';
declare var BuyWithCrypto: any;

@Component({
    selector: 'app-donation',
    templateUrl: './donation.component.html',
    styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {
    constructor(
        public logger: NgxFancyLoggerService,
        private scriptService: ScriptService
    ) {}

    ngOnInit() {
        this.scriptService.load('coinbase').then(() => {
            BuyWithCrypto.registerCallback('onSuccess', e => {
                this.logger.debug('donation.component', 'onSuccess', e);
            });
            BuyWithCrypto.registerCallback('onFailure', e => {
                this.logger.debug('donation.component', 'onFailure', e);
            });
            BuyWithCrypto.registerCallback('onPaymentDetected', e => {
                this.logger.debug('donation.component', 'onPaymentDetected', e);
            });
        });
    }
}
