import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Input, Component } from '@angular/core';
import { PodcastEntry } from 'app/core';

@Component({
    selector: 'app-entry-delete-modal-content',
    styles: [
        `
            .modal-entry-image {
                width: 64px;
                height: 64px;
            }
        `,
    ],
    template: `
        <div class="block block-themed block-transparent mb-0">
            <div class="block-header bg-primary-dark">
                <h3 class="block-title">
                    Delete this podcast entry?
                </h3>
                <div class="block-options">
                    <button
                        type="button"
                        class="btn-block-option"
                        data-dismiss="modal"
                        aria-label="Close"
                        (click)="modal.close('')"
                    >
                        <i class= "fa-solid fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="block-content">
                <h3 class="mb-20">
                    This operation cannot be undone!
                </h3>
                <div class="container-fluid cxt-padded bg-faded">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-2 text-md-left text-center">
                                <img
                                    class="modal-entry-image rounded-circle"
                                    [src]="entry.thumbnailUrl"
                                    alt="Generic placeholder image"
                                />
                            </div>
                            <div
                                class="col-md-10 text-md-left text-center font-w600"
                            >
                                {{ entry.title }}
                            </div>
                        </div>
                    </div>
                </div>
                <p class="mt-20">
                    Deleting this entry will delete all associated audio with no
                    opportunity to get it back. It will also be removed from any
                    podcast applications subscribed to this feed..
                </p>
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-alt-secondary"
                    data-dismiss="modal"
                    (click)="modal.close('')"
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
})
export class EntryDeleteItemModalComponent {
    @Input() public entry: PodcastEntry;
    constructor(public modal: NgbActiveModal) {}
}
