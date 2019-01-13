import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPodcastItemComponent } from './sidebar-podcast-item.component';

describe('SidebarPodcastItemComponent', () => {
  let component: SidebarPodcastItemComponent;
  let fixture: ComponentFixture<SidebarPodcastItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarPodcastItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarPodcastItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
