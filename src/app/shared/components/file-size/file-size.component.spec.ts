import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSizeComponent } from './file-size.component';

describe('FileSizeComponent', () => {
  let component: FileSizeComponent;
  let fixture: ComponentFixture<FileSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileSizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
