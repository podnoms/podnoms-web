import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ServerShowcaseModalComponent } from './server-showcase-modal.component';

describe('ServerShowcaseModalComponent', () => {
  let component: ServerShowcaseModalComponent;
  let fixture: ComponentFixture<ServerShowcaseModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerShowcaseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerShowcaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
