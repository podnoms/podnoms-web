import { Profile } from '../../../core/model/profile';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    styles: [``],
    template: `
        <div class="block block-themed block-transparent mb-0">
            <div class="block-header bg-primary-dark">
                <h3 class="block-title">Enter a username...</h3>
            </div>
            <div class="block-content"></div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-alt-success"
                    data-dismiss="modal"
                    (click)="modal.close('done')"
                >
                    <i class="fa fa-check"></i> Done
                </button>
            </div>
        </div>
    `
})
export class UserSlugModalComponent {
    @Input() public profile: Profile;
    constructor(public modal: NgbActiveModal) {}
}
