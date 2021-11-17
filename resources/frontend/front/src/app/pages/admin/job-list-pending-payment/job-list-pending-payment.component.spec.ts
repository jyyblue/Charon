import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListPendingPaymentComponent } from './job-list-pending-payment.component';

describe('JobListPendingPaymentComponent', () => {
  let component: JobListPendingPaymentComponent;
  let fixture: ComponentFixture<JobListPendingPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobListPendingPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobListPendingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
