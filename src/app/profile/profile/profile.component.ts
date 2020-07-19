import {
    Component,
    ElementRef,
    ViewChild,
    SimpleChanges,
    OnInit,
    AfterViewInit,
} from '@angular/core';
import { Profile, ProfileLimits, Payment } from '../../core';
import { BasePageComponent } from '../../shared/components/base-page/base-page.component';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    switchMap,
} from 'rxjs/operators';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { ProfileDataService } from '../profile-data.service';
import { ProfileStoreService } from '../profile-store.service';
import { ImageUploadComponent } from '../../shared/components/image-upload/image-upload.component';
import { UUID } from 'angular2-uuid';
import { BaseChartDirective } from 'ng2-charts';
import { AlertService } from '../../core/alerts/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UiStateService } from 'app/core/ui-state.service';
import { NGXLogger } from 'ngx-logger';
import { environment } from 'environments/environment';
import { isUndefined } from 'util';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends BasePageComponent
    implements OnInit, AfterViewInit {
    public chartLabels: string[] = ['Used', 'Available'];
    public chartData: number[] = [85, 15];
    public activeTab: string = 'details';
    public storageAvailable: number = 0;
    public chartOptions: any = {
        legend: {
            display: true,
            position: 'bottom',
        },
        tooltips: {
            callbacks: {
                label: (tooltipItem, data) => {
                    const dataset = data.datasets[tooltipItem.datasetIndex];
                    const meta = dataset._meta[Object.keys(dataset._meta)[0]];
                    const total = meta.total;
                    const currentValue = dataset.data[tooltipItem.index];
                    const percentage = parseFloat(
                        ((currentValue / total) * 100).toFixed(1)
                    );
                    return (
                        this._bytesToHuman(currentValue) +
                        ' (' +
                        percentage +
                        '%)'
                    );
                },
                title: function (tooltipItem, data) {
                    return data.labels[tooltipItem[0].index];
                },
            },
        },
    };
    @ViewChild(BaseChartDirective)
    private _chart: BaseChartDirective;

    @ViewChild('imageControl')
    imageControl: ImageUploadComponent;

    profile$: Observable<Profile>;
    destroy$ = new Subject();

    searchTerm$ = new Subject<string>();

    originalSlug: string;
    slugError: string = '';

    sending = false;

    @ViewChild('fileInput')
    fileInput: ElementRef;
    limits$: Observable<ProfileLimits>;

    slugging: boolean = false;
    do: string = 'profile';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private profileStoreService: ProfileStoreService,
        private profileDataService: ProfileDataService,
        private alertService: AlertService,
        logger: NGXLogger,
        uiStateService: UiStateService
    ) {
        super();

        this.activeTab = this.route.snapshot.fragment ?? this.activeTab;
        this.route.fragment.subscribe((fragment) => {
            if (fragment) {
                this.logger.debug(
                    'profile.component',
                    'fragmentChanged',
                    fragment
                );
                this.activeTab = fragment;
            }
        });
        this.logger.debug(
            'profile.component',
            'ctor',
            'activeTab',
            this.activeTab
        );
        this.searchTerm$
            .pipe(
                debounceTime(400),
                distinctUntilChanged(),
                switchMap((term) => this.profileDataService.checkSlug(term))
            )
            .subscribe((r) => {
                if (r) {
                    this.slugError = '';
                } else {
                    this.slugError = 'Slug already exists';
                }
                this.slugging = false;
            });
        this.profile$ = this.profileStoreService.entities$.pipe(
            map((r) => r.filter((it) => it.slug !== null)[0])
        );
    }

    ngOnInit() {
        this.refreshLimits();
    }
    ngAfterViewInit() {
        this.route.queryParams.subscribe((params) => {
            this.logger.debug('profile.component', 'connect-return', params);
            if (params.connectResult && params.connectResult === 'fail') {
                this.alertService.error(
                    'Failure',
                    'Unable to connect accounts at this time'
                );
            } else if (
                params.connectResult &&
                params.connectResult === 'success'
            ) {
                this.alertService.success('Connected', params.reason);
            }
            this.location.replaceState('profile');
        });
    }
    private _bytesToHuman(bytes: number) {
        if (bytes === 0) {
            return '0 Bytes';
        }
        const k = 1024,
            dm = 0,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return (
            parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
        );
    }

    refreshLimits() {
        this.profileDataService.getLimits().subscribe((l) => {
            this.storageAvailable = l.storageQuota;
            this.chartData = [l.storageUsed, l.storageQuota - l.storageUsed];

            const used = this._bytesToHuman(l.storageUsed);
            const available = this._bytesToHuman(
                l.storageQuota - l.storageUsed
            );

            this.chartLabels = [`Used: ${used}`, `Available: ${available}`];
            if (this._chart) {
                this._chart.ngOnChanges({} as SimpleChanges);
                this._chart.chart.update();
            }
        });
    }
    regenerateApiKey() {
        // this._service.regenerateApiKey().subscribe(a => (profile.apiKey = a));
    }
    doSave(profile: Profile) {
        this.profileDataService.updateProfile(profile).subscribe((p) => {
            if (this.imageControl.imageChanged) {
                this.imageControl.commitImage(p.id, 'profile').subscribe(
                    (r) => {
                        profile.profileImageUrl = `${
                            r.profileImageUrl
                        }?v=${UUID.UUID()}`;
                        profile.thumbnailImageUrl = `${
                            r.thumbnailImageUrl
                        }?v=${UUID.UUID()}`;
                        this.profileStoreService.updateOneInCache(profile);
                        this.alertService.info(
                            'Success',
                            'Profile updated successfully'
                        );
                        // this.router.navigate(['/']);
                    },
                    (err) => {
                        this.logger.debug('profile.component', 'Error', err);
                    }
                );
            } else {
                this.alertService.info(
                    'Success',
                    'Profile updated successfully'
                );
            }
        });
    }

    connectToPatreon() {
        window.location.href = `https://www.patreon.com/oauth2/authorize?response_type=code&client_id=${environment.patreon.clientId}&redirect_uri=${environment.patreon.redirectUri}`;
    }
}
