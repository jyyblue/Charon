import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegBox3Component } from './reg-box3.component';

describe('RegBox3Component', () => {
  let component: RegBox3Component;
  let fixture: ComponentFixture<RegBox3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegBox3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegBox3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
