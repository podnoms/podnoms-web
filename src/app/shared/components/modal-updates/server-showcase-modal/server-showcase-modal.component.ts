import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SiteMessage } from 'app/core';

@Component({
    selector: 'app-server-showcase-modal',
    templateUrl: './server-showcase-modal.component.html',
    styleUrls: ['./server-showcase-modal.component.scss'],
})
export class ServerShowcaseModalComponent {
    @Input() showcase: SiteMessage;
    constructor(public modal: NgbActiveModal) {}

    doLearnMore() {
        this.modal.close('learn-more');
        if (this.showcase.url) {
            window.open(this.showcase.url, '_blank');
        }
    }
    closeShowcase(result: string) {
        this.modal.close(result);
    }
}
