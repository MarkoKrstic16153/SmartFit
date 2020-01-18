import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HranaComponent } from './hrana.component';

describe('HranaComponent', () => {
  let component: HranaComponent;
  let fixture: ComponentFixture<HranaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HranaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HranaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
