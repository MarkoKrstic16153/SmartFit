import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilKlijentComponent } from './profil-klijent.component';

describe('ProfilKlijentComponent', () => {
  let component: ProfilKlijentComponent;
  let fixture: ComponentFixture<ProfilKlijentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilKlijentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilKlijentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
