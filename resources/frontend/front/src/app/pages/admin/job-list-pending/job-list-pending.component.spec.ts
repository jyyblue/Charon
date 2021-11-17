import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListPendingComponent } from './job-list-pending.component';

describe('JobListPendingComponent', () => {
  let component: JobListPendingComponent;
  let fixture: ComponentFixture<JobListPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobListPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobListPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
