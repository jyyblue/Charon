import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverDetailTabComponent } from './driver-detail-tab.component';

describe('DriverDetailTabComponent', () => {
  let component: DriverDetailTabComponent;
  let fixture: ComponentFixture<DriverDetailTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverDetailTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverDetailTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
