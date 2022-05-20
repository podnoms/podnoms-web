import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UiStateService } from 'app/core/ui-state.service';
import { PodcastStoreService } from 'app/podcasts/podcast-store.service';
import { ProfileDataService } from 'app/profile/profile-data.service';
import { NGXLogger } from 'ngx-logger';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { ProfileStoreService } from '../profile/profile-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private _destroyed$: Subject<any>;
  loaded: boolean = false;
  constructor(
    private router: Router,
    private profileStoreService: ProfileStoreService,
    private profileDataService: ProfileDataService,
    private podcastStoreService: PodcastStoreService,
    private authService: AuthService,
    private logger: NGXLogger,
    private uiStateService: UiStateService
  ) {
    this._destroyed$ = new Subject();
    this.logger.debug('home.component', 'ctor');
  }
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      // no point doing any of this if we have no JWT
      this.profileDataService
        .getProfile()
        .pipe(filter((r) => r !== null))
        .subscribe(
          (profile) => {
            const podcastSlug = localStorage.getItem('__spslug');
            if (podcastSlug) {
              this.router.navigate(['podcasts', podcastSlug], {
                replaceUrl: true,
              });
            } else {
              const storeSubscriber = this.podcastStoreService.getAll();
              storeSubscriber.pipe().subscribe((p) => {
                if (p && p.length !== 0) {
                  this.router.navigate(['podcasts', p[0].slug]);
                } else {
                  this.router.navigate(['podcasts']);
                }
              });
            }
          },
          (err) => {
            this.logger.error('home.component', 'err', err);
            this.authService.logout();
            window.location.reload();
          }
        );
    } else {
      this.loaded = true;
    }
  }
  ngOnDestroy() {
    this._destroyed$.next(null);
    this._destroyed$.complete();
  }
}
