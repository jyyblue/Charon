import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobEditQueryComponent } from './job-edit-query.component';

describe('JobEditQueryComponent', () => {
  let component: JobEditQueryComponent;
  let fixture: ComponentFixture<JobEditQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobEditQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobEditQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
