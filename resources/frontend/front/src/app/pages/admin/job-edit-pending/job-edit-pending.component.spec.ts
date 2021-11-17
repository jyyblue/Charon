import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobEditPendingComponent } from './job-edit-pending.component';

describe('JobEditPendingComponent', () => {
  let component: JobEditPendingComponent;
  let fixture: ComponentFixture<JobEditPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobEditPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobEditPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
