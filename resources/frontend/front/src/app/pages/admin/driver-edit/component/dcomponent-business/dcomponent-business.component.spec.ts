import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcomponentBusinessComponent } from './dcomponent-business.component';

describe('DcomponentBusinessComponent', () => {
  let component: DcomponentBusinessComponent;
  let fixture: ComponentFixture<DcomponentBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcomponentBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcomponentBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
