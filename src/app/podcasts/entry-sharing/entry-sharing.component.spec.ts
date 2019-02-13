import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrySharingComponent } from './entry-sharing.component';

describe('EntrySharingComponent', () => {
  let component: EntrySharingComponent;
  let fixture: ComponentFixture<EntrySharingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrySharingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrySharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
