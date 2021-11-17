import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegBox1Component } from './reg-box1.component';

describe('RegBox1Component', () => {
  let component: RegBox1Component;
  let fixture: ComponentFixture<RegBox1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegBox1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegBox1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
