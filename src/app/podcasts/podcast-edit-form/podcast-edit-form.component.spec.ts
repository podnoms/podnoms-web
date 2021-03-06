import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PodcastEditFormComponent } from './podcast-edit-form.component';

describe('PodcastEditFormComponent', () => {
    let component: PodcastEditFormComponent;
    let fixture: ComponentFixture<PodcastEditFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [PodcastEditFormComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PodcastEditFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
