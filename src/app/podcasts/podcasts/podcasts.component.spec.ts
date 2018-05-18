import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastsComponent } from './podcasts.component';

describe('PodcastsComponent', () => {
    let component: PodcastsComponent;
    let fixture: ComponentFixture<PodcastsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PodcastsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PodcastsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
