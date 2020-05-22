import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirollComponent } from './rediroll.component';

describe('RedirollComponent', () => {
  let component: RedirollComponent;
  let fixture: ComponentFixture<RedirollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
