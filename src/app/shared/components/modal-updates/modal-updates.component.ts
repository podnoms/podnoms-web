import { ProfileDataService } from './../../../profile/profile-data.service';
import {
    Component,
    Input,
    AfterViewInit,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserSlugModalComponent } from './user-slug-modal.component';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { ServerShowcaseModalComponent } from './server-showcase-modal/server-showcase-modal.component';

@Component({
    selector: 'app-modal-updates',
    template: '',
    styleUrls: ['./modal-updates.component.scss'],
})
export class ModalUpdatesComponent implements AfterViewInit {
    @Input() action$: Observable<any>;
    @ViewChild('content') content: ElementRef;

    constructor(
        private router: Router,
        private profileService: ProfileDataService,
        private modalService: NgbModal,
        private logger: NGXLogger
    ) {}

    ngAfterViewInit() {
        this.action$.subscribe((a) => {
            if (typeof a === 'string') {
                if (a === 'redirectslug') {
                    this._doSlugRedirect();
                }
            } else {
                this._doServerShowcase(a);
            }
        });
    }
    _doServerShowcase(showcase) {
        const storageKey = `ssc--${showcase.id}`;
        const previous = JSON.parse(localStorage.getItem(storageKey));

        if (!previous) {
            const modalRef = this.modalService.open(
                ServerShowcaseModalComponent,
                {
                    size: 'lg',
                }
            );
            modalRef.componentInstance.showcase = showcase;
            modalRef.result.then((r) => {
                localStorage.setItem(
                    storageKey,
                    JSON.stringify({
                        id: showcase.id,
                        shown: new Date(),
                        count: previous?.count ?? 1,
                    })
                );
            });
        }
    }
    _doSlugRedirect() {
        let value = parseInt(localStorage.getItem('profile_slug_nag'), 10);
        if (!value) {
            value = 0;
        }
        if (value % 10 === 0) {
            this.profileService.getProfile().subscribe((p) => {
                if (p) {
                    this.profileService.checkUserNeedsRedirect().subscribe(
                        (response) => {
                            if (response.ok && response.status === 200) {
                                const modalRef = this.modalService.open(
                                    UserSlugModalComponent,
                                    { size: 'lg' }
                                );
                                modalRef.componentInstance.profile = p[0];
                                modalRef.result.then((r) => {
                                    if (r === 'gotoprofile') {
                                        this.router.navigate(['/profile']);
                                    }
                                });
                            }
                        },
                        () =>
                            this.logger.debug(
                                'modal-updates.component',
                                'No redirect necessary'
                            )
                    );
                }
            });
        }
        localStorage.setItem('profile_slug_nag', (++value).toString());
    }
}
