import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcomponentVehicleComponent } from './dcomponent-vehicle.component';

describe('DcomponentVehicleComponent', () => {
  let component: DcomponentVehicleComponent;
  let fixture: ComponentFixture<DcomponentVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcomponentVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcomponentVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
