import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcDetailSeComponent } from './dc-detail-se.component';

describe('DcDetailSeComponent', () => {
  let component: DcDetailSeComponent;
  let fixture: ComponentFixture<DcDetailSeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcDetailSeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcDetailSeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
