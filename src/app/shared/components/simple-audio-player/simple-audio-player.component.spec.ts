import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SimpleAudioPlayerComponent } from './simple-audio-player.component';

describe('SimpleAudioPlayerComponent', () => {
  let component: SimpleAudioPlayerComponent;
  let fixture: ComponentFixture<SimpleAudioPlayerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleAudioPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleAudioPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
