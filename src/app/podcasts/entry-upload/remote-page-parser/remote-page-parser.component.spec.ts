import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RemotePageParserComponent } from './remote-page-parser.component';

describe('RemotePageParserComponent', () => {
  let component: RemotePageParserComponent;
  let fixture: ComponentFixture<RemotePageParserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RemotePageParserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemotePageParserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
