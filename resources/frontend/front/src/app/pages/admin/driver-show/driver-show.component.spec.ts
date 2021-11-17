import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverShowComponent } from './driver-show.component';

describe('DriverShowComponent', () => {
  let component: DriverShowComponent;
  let fixture: ComponentFixture<DriverShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
