import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegBox2Component } from './reg-box2.component';

describe('RegBox2Component', () => {
  let component: RegBox2Component;
  let fixture: ComponentFixture<RegBox2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegBox2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegBox2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
