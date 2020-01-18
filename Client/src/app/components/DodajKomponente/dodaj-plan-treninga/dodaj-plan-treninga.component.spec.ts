import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajPlanTreningaComponent } from './dodaj-plan-treninga.component';

describe('DodajPlanTreningaComponent', () => {
  let component: DodajPlanTreningaComponent;
  let fixture: ComponentFixture<DodajPlanTreningaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajPlanTreningaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajPlanTreningaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
