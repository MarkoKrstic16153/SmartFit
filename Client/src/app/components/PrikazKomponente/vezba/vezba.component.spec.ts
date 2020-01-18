import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VezbaComponent } from './vezba.component';

describe('VezbaComponent', () => {
  let component: VezbaComponent;
  let fixture: ComponentFixture<VezbaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VezbaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VezbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
