import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcomponentHistoryMailComponent } from './dcomponent-history-mail.component';

describe('DcomponentHistoryMailComponent', () => {
  let component: DcomponentHistoryMailComponent;
  let fixture: ComponentFixture<DcomponentHistoryMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcomponentHistoryMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcomponentHistoryMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
