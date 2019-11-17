import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Podcast } from 'app/core';

@Component({
    selector: 'app-podcast-delete-modal',
    template: `
        <div class="block block-themed block-transparent mb-0">
            <div class="block-header bg-primary-dark">
                <h3 class="block-title">Delete this podcast?</h3>
                <div class="block-options">
                    <button
                        type="button"
                        class="btn-block-option"
                        data-dismiss="modal"
                        aria-label="Close"
                        (click)="modal.close()"
                    >
                        <i class="icon icon-close"></i>
                    </button>
                </div>
            </div>
            <div class="block-content">
                <h3 class="mb-20">This operation cannot be undone!</h3>
                <div class="container-fluid cxt-padded bg-faded">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-2 text-md-left text-center">
                                <img
                                    class="modal-podcast-image rounded-circle"
                                    [src]="podcast.imageUrl"
                                    alt="Generic placeholder image"
                                />
                            </div>
                            <div
                                class="col-md-10 text-md-left text-center font-w600"
                            >
                                {{ podcast.title }}
                            </div>
                        </div>
                    </div>
                </div>
                <p class="mt-20">
                    Deleting this podcast will delete all associated entries and
                    audio with no opportunity to get them back. It will also be
                    removed from any podcast applications subscribed to this
                    feed..
                </p>
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
                    <i class="fa fa-check"></i> Yes
                </button>
            </div>
        </div>
    `,
    styles: [
        `
            .modal-podcast-image {
                width: 64px;
                height: 64px;
            }
        `
    ]
})
export class PodcastDeleteComponent implements OnInit {
    @Input() public podcast: Podcast;
    constructor(public modal: NgbActiveModal) {}

    ngOnInit(): void {}
}
