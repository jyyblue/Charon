import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcomponentDetailComponent } from './dcomponent-detail.component';

describe('DcomponentDetailComponent', () => {
  let component: DcomponentDetailComponent;
  let fixture: ComponentFixture<DcomponentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcomponentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcomponentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
