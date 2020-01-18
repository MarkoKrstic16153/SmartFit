import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajPlanIshraneComponent } from './dodaj-plan-ishrane.component';

describe('DodajPlanIshraneComponent', () => {
  let component: DodajPlanIshraneComponent;
  let fixture: ComponentFixture<DodajPlanIshraneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajPlanIshraneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajPlanIshraneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
