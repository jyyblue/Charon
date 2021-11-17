import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegBox5Component } from './reg-box5.component';

describe('RegBox5Component', () => {
  let component: RegBox5Component;
  let fixture: ComponentFixture<RegBox5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegBox5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegBox5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
