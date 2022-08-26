import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcomponentLicenceComponent } from './dcomponent-licence.component';

describe('DcomponentLicenceComponent', () => {
  let component: DcomponentLicenceComponent;
  let fixture: ComponentFixture<DcomponentLicenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcomponentLicenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcomponentLicenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
