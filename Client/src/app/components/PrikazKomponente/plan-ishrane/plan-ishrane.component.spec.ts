import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanIshraneComponent } from './plan-ishrane.component';

describe('PlanIshraneComponent', () => {
  let component: PlanIshraneComponent;
  let fixture: ComponentFixture<PlanIshraneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanIshraneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanIshraneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
