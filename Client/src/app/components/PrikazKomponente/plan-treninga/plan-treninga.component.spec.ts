import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanTreningaComponent } from './plan-treninga.component';

describe('PlanTreningaComponent', () => {
  let component: PlanTreningaComponent;
  let fixture: ComponentFixture<PlanTreningaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanTreningaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanTreningaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
