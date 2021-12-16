import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodEmailSendComponent } from './pod-email-send.component';

describe('PodEmailSendComponent', () => {
  let component: PodEmailSendComponent;
  let fixture: ComponentFixture<PodEmailSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodEmailSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodEmailSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
