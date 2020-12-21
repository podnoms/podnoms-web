import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EntryListItemComponent } from './entry-list-item.component';

describe('EntryListItemComponent', () => {
    let component: EntryListItemComponent;
    let fixture: ComponentFixture<EntryListItemComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [EntryListItemComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EntryListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
