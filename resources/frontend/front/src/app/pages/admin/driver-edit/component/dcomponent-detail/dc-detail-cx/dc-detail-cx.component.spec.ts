import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcDetailCxComponent } from './dc-detail-cx.component';

describe('DcDetailCxComponent', () => {
  let component: DcDetailCxComponent;
  let fixture: ComponentFixture<DcDetailCxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcDetailCxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcDetailCxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
