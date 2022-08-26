import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcomponentHealthComponent } from './dcomponent-health.component';

describe('DcomponentHealthComponent', () => {
  let component: DcomponentHealthComponent;
  let fixture: ComponentFixture<DcomponentHealthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcomponentHealthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcomponentHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
