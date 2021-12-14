import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineAddComponent } from './inline-add.component';

describe('InlineAddComponent', () => {
  let component: InlineAddComponent;
  let fixture: ComponentFixture<InlineAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
