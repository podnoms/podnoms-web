import { ProfileDataService } from './../../../profile/profile-data.service';
import { Profile } from './../../../core/model/profile';
import {
    Component,
    Input,
    AfterViewInit,
    ViewChild,
    ElementRef
} from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserSlugModalComponent } from './user-slug-modal.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-modal-updates',
    template: '',
    styleUrls: ['./modal-updates.component.scss']
})
export class ModalUpdatesComponent implements AfterViewInit {
    @Input() action$: Observable<string>;
    @ViewChild('content', { static: false }) content: ElementRef;

    constructor(
        private router: Router,
        private profileService: ProfileDataService,
        private modalService: NgbModal
    ) {}

    ngAfterViewInit() {
        this.action$.subscribe(a => {
            if (a === 'redirectslug') {
            }
        });
    }
    _doSlugRedirect() {
        if (!localStorage.getItem('profile_slug_nag')) {
            this.profileService.getProfile().subscribe(p => {
                if (p) {
                    this.profileService.checkUserNeedsRedirect().subscribe(
                        () => {
                            localStorage.setItem(
                                'profile_slug_nag',
                                new Date().getTime().toString()
                            );
                            const modalRef = this.modalService.open(
                                UserSlugModalComponent,
                                { size: 'lg' }
                            );
                            modalRef.componentInstance.profile = p;
                            modalRef.result.then(r => {
                                if (r === 'ok') {
                                    this.router.navigate(['/profile']);
                                }
                            });
                        },
                        () =>
                            console.log(
                                'modal-updates.component',
                                'No redirect necessary'
                            )
                    );
                }
            });
        }
    }
}
