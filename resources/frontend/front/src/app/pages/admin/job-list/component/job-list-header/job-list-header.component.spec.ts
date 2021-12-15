import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListHeaderComponent } from './job-list-header.component';

describe('JobListHeaderComponent', () => {
  let component: JobListHeaderComponent;
  let fixture: ComponentFixture<JobListHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobListHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
