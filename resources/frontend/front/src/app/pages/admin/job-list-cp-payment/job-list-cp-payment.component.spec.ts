import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListCpPaymentComponent } from './job-list-cp-payment.component';

describe('JobListCpPaymentComponent', () => {
  let component: JobListCpPaymentComponent;
  let fixture: ComponentFixture<JobListCpPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobListCpPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobListCpPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
