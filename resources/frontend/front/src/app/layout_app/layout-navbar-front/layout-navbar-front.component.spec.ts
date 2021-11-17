import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutNavbarFrontComponent } from './layout-navbar-front.component';

describe('LayoutNavbarFrontComponent', () => {
  let component: LayoutNavbarFrontComponent;
  let fixture: ComponentFixture<LayoutNavbarFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutNavbarFrontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutNavbarFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
