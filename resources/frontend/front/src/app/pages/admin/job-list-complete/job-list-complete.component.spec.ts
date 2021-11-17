import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListCompleteComponent } from './job-list-complete.component';

describe('JobListCompleteComponent', () => {
  let component: JobListCompleteComponent;
  let fixture: ComponentFixture<JobListCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobListCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobListCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
