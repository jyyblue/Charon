import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcomponentAssetComponent } from './dcomponent-asset.component';

describe('DcomponentAssetComponent', () => {
  let component: DcomponentAssetComponent;
  let fixture: ComponentFixture<DcomponentAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcomponentAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcomponentAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
