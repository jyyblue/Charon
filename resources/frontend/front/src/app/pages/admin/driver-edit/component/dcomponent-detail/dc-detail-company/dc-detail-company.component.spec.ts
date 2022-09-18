import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcDetailCompanyComponent } from './dc-detail-company.component';

describe('DcDetailCompanyComponent', () => {
  let component: DcDetailCompanyComponent;
  let fixture: ComponentFixture<DcDetailCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcDetailCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcDetailCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
