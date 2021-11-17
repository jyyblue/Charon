import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegBox4Component } from './reg-box4.component';

describe('RegBox4Component', () => {
  let component: RegBox4Component;
  let fixture: ComponentFixture<RegBox4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegBox4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegBox4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
