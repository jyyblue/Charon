import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcomponentHistoryJobComponent } from './dcomponent-history-job.component';

describe('DcomponentHistoryJobComponent', () => {
  let component: DcomponentHistoryJobComponent;
  let fixture: ComponentFixture<DcomponentHistoryJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcomponentHistoryJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcomponentHistoryJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
