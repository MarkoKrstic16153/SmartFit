import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajHranuComponent } from './dodaj-hranu.component';

describe('DodajHranuComponent', () => {
  let component: DodajHranuComponent;
  let fixture: ComponentFixture<DodajHranuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DodajHranuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajHranuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
