import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-notification-delete-modal-content',
    template: `
        <div class="block block-themed mb-0">
            <div class="block-header bg-primary-dark">
                <h3 class="block-title">Delete this notification?</h3>
                <div class="block-options">
                    <button
                        type="button"
                        class="btn-block-option"
                        data-dismiss="modal"
                        aria-label="Close"
                        (click)="modal.close()"
                    >
                        <i class="fa fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="block-content">
                <h3 class="mb-20">This operation cannot be undone!</h3>
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-alt-secondary"
                    data-dismiss="modal"
                    (click)="modal.close()"
                >
                    No
                </button>
                <button
                    type="button"
                    class="btn btn-alt-success"
                    data-dismiss="modal"
                    (click)="modal.close('delete')"
                >
                    <i class="fas fa fa-check"></i> Yes
                </button>
            </div>
        </div>
    `,
    styles: [``],
})
export class NotificationItemDeleteComponent {
    constructor(public modal: NgbActiveModal) {}
}
