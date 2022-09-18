import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcDetailPayeComponent } from './dc-detail-paye.component';

describe('DcDetailPayeComponent', () => {
  let component: DcDetailPayeComponent;
  let fixture: ComponentFixture<DcDetailPayeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcDetailPayeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcDetailPayeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
