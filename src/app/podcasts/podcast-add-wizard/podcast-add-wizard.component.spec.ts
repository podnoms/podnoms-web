import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastAddWizardComponent } from './podcast-add-wizard.component';

describe('PodcastAddWizardComponent', () => {
    let component: PodcastAddWizardComponent;
    let fixture: ComponentFixture<PodcastAddWizardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PodcastAddWizardComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PodcastAddWizardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
