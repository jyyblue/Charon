import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcomponentFinancialDetailComponent } from './dcomponent-financial-detail.component';

describe('DcomponentFinancialDetailComponent', () => {
  let component: DcomponentFinancialDetailComponent;
  let fixture: ComponentFixture<DcomponentFinancialDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcomponentFinancialDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcomponentFinancialDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
