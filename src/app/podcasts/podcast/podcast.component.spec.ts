import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PodcastComponent } from './podcast.component';

describe('PodcastsComponent', () => {
    let component: PodcastComponent;
    let fixture: ComponentFixture<PodcastComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [PodcastComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PodcastComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
