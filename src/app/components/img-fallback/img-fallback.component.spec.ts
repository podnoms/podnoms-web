import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgFallbackComponent } from './img-fallback.component';

describe('ImgFallbackComponent', () => {
  let component: ImgFallbackComponent;
  let fixture: ComponentFixture<ImgFallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgFallbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgFallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
