import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajVezbuComponent } from './dodaj-vezbu.component';

describe('DodajVezbuComponent', () => {
  let component: DodajVezbuComponent;
  let fixture: ComponentFixture<DodajVezbuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajVezbuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajVezbuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
