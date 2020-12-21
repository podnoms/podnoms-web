import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeApiKeyComponent } from './youtube-api-key.component';

describe('YoutubeApiKeyComponent', () => {
  let component: YoutubeApiKeyComponent;
  let fixture: ComponentFixture<YoutubeApiKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoutubeApiKeyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeApiKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
