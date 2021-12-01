import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobEditCpPaymentComponent } from './job-edit-cp-payment.component';

describe('JobEditCpPaymentComponent', () => {
  let component: JobEditCpPaymentComponent;
  let fixture: ComponentFixture<JobEditCpPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobEditCpPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobEditCpPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
