import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilInstruktorComponent } from './profil-instruktor.component';

describe('ProfilInstruktorComponent', () => {
  let component: ProfilInstruktorComponent;
  let fixture: ComponentFixture<ProfilInstruktorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilInstruktorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilInstruktorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
