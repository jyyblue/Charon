import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcomponentTrainingComponent } from './dcomponent-training.component';

describe('DcomponentTrainingComponent', () => {
  let component: DcomponentTrainingComponent;
  let fixture: ComponentFixture<DcomponentTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcomponentTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcomponentTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
