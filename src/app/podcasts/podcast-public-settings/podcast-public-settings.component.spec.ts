import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PodcastPublicSettingsComponent } from './podcast-public-settings.component';

describe('PodcastPrivacyComponent', () => {
    let component: PodcastPrivacyComponent;
    let fixture: ComponentFixture<PodcastPrivacyComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [PodcastPublicSettingsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PodcastPublicSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
