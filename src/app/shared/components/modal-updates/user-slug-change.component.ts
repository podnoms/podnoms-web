import { Component, OnInit } from '@angular/core';

@Component({
    styles: [``],
    template: `
        <div class="block block-themed block-transparent mb-0">
            <div class="block-header bg-primary-dark">
                <h3 class="block-title">Head's Up!!!</h3>
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
                <h5>
                    We've noticed that you're still using the username that was
                    assigned to you when you started!
                </h5>
                <div class="mt-20">
                    <div>This means your RSS url is going to be</div>
                    <div class="font-size-sm text-muted">
                        http://rss.podnoms.com/{{ profile.slug }}/podcast
                    </div>
                </div>
                <div class="mt-20">
                    <div>Whereas it would be nicer were it</div>
                    <div class="font-size-sm text-muted">
                        http://rss.podnoms.com/<b>your-name</b>/podcast
                    </div>
                </div>
                <div class="mt-20 mb-20">
                    <div>
                        Would you like to go to your profile settings so you can
                        change this?
                    </div>
                    <div class="font-size-sm text-muted">
                        Don't worry, all your old RSS URLS will still work.
                    </div>
                </div>
                <div class="modal-footer">
                    <p class="text-muted">
                        We are gonna keep bugging you about this, so you might
                        as well change it now 😒
                    </p>
                    <button
                        type="button"
                        class="btn btn-outline-secondary"
                        (click)="modal.dismiss()"
                    >
                        No Thanks
                    </button>
                    <button
                        type="button"
                        class="btn btn-success"
                        (click)="modal.close('ok')"
                    >
                        Yes Please
                    </button>
                </div>
            </div>
        </div>
    `
})
export class UserSlugChangeComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
