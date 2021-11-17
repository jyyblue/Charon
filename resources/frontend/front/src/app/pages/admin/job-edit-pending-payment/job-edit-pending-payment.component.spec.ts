import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobEditPendingPaymentComponent } from './job-edit-pending-payment.component';

describe('JobEditPendingPaymentComponent', () => {
  let component: JobEditPendingPaymentComponent;
  let fixture: ComponentFixture<JobEditPendingPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobEditPendingPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobEditPendingPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
