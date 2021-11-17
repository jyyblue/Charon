import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegBoxComponent } from './reg-box.component';

describe('RegBoxComponent', () => {
  let component: RegBoxComponent;
  let fixture: ComponentFixture<RegBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
