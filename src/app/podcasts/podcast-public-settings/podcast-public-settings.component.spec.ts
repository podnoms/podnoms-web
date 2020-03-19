import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PodcastPublicSettingsComponent } from './podcast-public-settings.component';

describe('PodcastPrivacyComponent', () => {
    let component: PodcastPrivacyComponent;
    let fixture: ComponentFixture<PodcastPrivacyComponent>;

    beforeEach(async(() => {
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