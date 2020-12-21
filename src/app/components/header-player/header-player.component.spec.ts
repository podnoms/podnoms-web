import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeaderPlayerComponent } from './header-player.component';

describe('HeaderPlayerComponent', () => {
  let component: HeaderPlayerComponent;
  let fixture: ComponentFixture<HeaderPlayerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
