import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListQueryComponent } from './job-list-query.component';

describe('JobListQueryComponent', () => {
  let component: JobListQueryComponent;
  let fixture: ComponentFixture<JobListQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobListQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobListQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
