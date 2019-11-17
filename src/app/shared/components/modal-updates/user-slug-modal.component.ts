import { Profile } from '../../../core/model/profile';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    styles: [``],
    template: `
        <div class="block block-themed block-transparent mb-0">
            <div class="block-header bg-primary-dark">
                <h3 class="block-title">Hey there!!!</h3>
            </div>
            <div class="block-content nice-copy-story">
                <h5>
                    Pardon the interruption but we notice you haven't edited
                    your profile yet?
                </h5>
                <p>
                    Your current username is
                    <span class="text-primary">{{ profile.slug }}</span> which
                    means the URL for all your podcasts will be
                </p>
                <p>
                    <code
                        >https://rss.podnoms.com/<b>{{ profile.slug }}</b
                        >/showname</code
                    >
                </p>
                <p>
                    which isn't so nice!
                </p>
                <p>
                    Click
                    <a class="alert-link" (click)="modal.close('gotoprofile')"
                        >here</a
                    >
                    to give yourself a more personalised user name and we'll
                    make sure to redirect any clients using the old URL.
                </p>
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-alt-success"
                    data-dismiss="modal"
                    (click)="modal.close('gotoprofile')"
                >
                    <i class="fa fa-check"></i> Go for it
                </button>
                <button
                    type="button"
                    class="btn btn-alt-secondary"
                    data-dismiss="modal"
                    (click)="modal.close('done')"
                >
                    <i class="fa fa-times"></i> Not now!
                </button>
            </div>
        </div>
    `
})
export class UserSlugModalComponent {
    @Input() public profile: Profile;
    constructor(public modal: NgbActiveModal) {}
}
