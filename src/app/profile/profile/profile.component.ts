import {
    Component,
    ElementRef,
    ViewChild,
    SimpleChanges,
    OnInit,
    AfterViewInit
} from '@angular/core';
import { Profile, ProfileLimits, Payment } from '../../core';
import { BasePageComponent } from '../../shared/components/base-page/base-page.component';
import {
    debounceTime,
    distinctUntilChanged,
    map,
    switchMap
} from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ProfileDataService } from '../profile-data.service';
import { ProfileStoreService } from '../profile-store.service';
import { ImageUploadComponent } from '../../shared/components/image-upload/image-upload.component';
import { UUID } from 'angular2-uuid';
import { BaseChartDirective } from 'ng2-charts';
import { AlertService } from '../../core/alerts/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BasePageComponent
    implements OnInit, AfterViewInit {
    public chartLabels: string[] = ['Used', 'Available'];
    public chartData: number[] = [85, 15];

    public storageAvailable: number = 0;
    public chartOptions: any = {
        legend: {
            display: true,
            position: 'bottom'
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
                title: function(tooltipItem, data) {
                    return data.labels[tooltipItem[0].index];
                }
            }
        }
    };
    @ViewChild(BaseChartDirective)
    private _chart: BaseChartDirective;

    @ViewChild('imageControl')
    imageControl: ImageUploadComponent;

    @ViewChild('tabs')
    private tabs: NgbTabset;

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
        private profileStoreService: ProfileStoreService,
        private profileDataService: ProfileDataService,
        private alertService: AlertService
    ) {
        super();
        this.searchTerm$
            .pipe(
                debounceTime(400),
                distinctUntilChanged(),
                switchMap(term => this.profileDataService.checkSlug(term))
            )
            .subscribe(r => {
                if (r) {
                    this.slugError = '';
                } else {
                    this.slugError = 'Slug already exists';
                }
                this.slugging = false;
            });
        this.profile$ = this.profileStoreService.entities$.pipe(
            map(r => r.filter(it => it.slug !== null)[0])
        );
    }

    ngOnInit() {
        this.refreshLimits();
    }
    ngAfterViewInit() {
        setTimeout(() => {
            const routeAction =
                this.route.snapshot.queryParamMap.get('do') || '';
            if (routeAction) {
                this.tabs.select(routeAction);
            }
        }, 1000);
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
        this.profileDataService.getLimits().subscribe(l => {
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
        this.profileDataService.updateProfile(profile).subscribe(p => {
            if (this.imageControl.imageChanged) {
                this.imageControl.commitImage(p.id, 'profile').subscribe(
                    r => {
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
                    err => {
                        console.log('profile.component', 'Error', err);
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
}
