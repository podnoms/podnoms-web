import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemotePageParserComponent } from './remote-page-parser.component';

describe('RemotePageParserComponent', () => {
  let component: RemotePageParserComponent;
  let fixture: ComponentFixture<RemotePageParserComponent>;

  beforeEach(async(() => {
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
