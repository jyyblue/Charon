import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcomponentHistoryPaymentComponent } from './dcomponent-history-payment.component';

describe('DcomponentHistoryPaymentComponent', () => {
  let component: DcomponentHistoryPaymentComponent;
  let fixture: ComponentFixture<DcomponentHistoryPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcomponentHistoryPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcomponentHistoryPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
