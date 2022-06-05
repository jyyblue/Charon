import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcomponentBasicComponent } from './dcomponent-basic.component';

describe('DcomponentBasicComponent', () => {
  let component: DcomponentBasicComponent;
  let fixture: ComponentFixture<DcomponentBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcomponentBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcomponentBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
