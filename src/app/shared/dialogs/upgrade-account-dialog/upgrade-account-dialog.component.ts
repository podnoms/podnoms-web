import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-upgrade-account-dialog',
    templateUrl: './upgrade-account-dialog.component.html',
    styleUrls: ['./upgrade-account-dialog.component.scss'],
})
export class UpgradeAccountDialogComponent {
    @Input() public extraText: string;
    constructor(public modal: NgbActiveModal) {}
}
