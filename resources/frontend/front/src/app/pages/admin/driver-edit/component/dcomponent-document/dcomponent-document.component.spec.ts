import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcomponentDocumentComponent } from './dcomponent-document.component';

describe('DcomponentDocumentComponent', () => {
  let component: DcomponentDocumentComponent;
  let fixture: ComponentFixture<DcomponentDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcomponentDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcomponentDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
