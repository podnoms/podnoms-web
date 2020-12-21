import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EntryEditFormComponent } from './entry-edit-form.component';

describe('EntryEditFormComponent', () => {
  let component: EntryEditFormComponent;
  let fixture: ComponentFixture<EntryEditFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
