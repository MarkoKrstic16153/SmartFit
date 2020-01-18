import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/PrijavaKomponente/login/login.component';
import { SignupComponent } from './components/PrijavaKomponente/signup/signup.component';
import { ProfilInstruktorComponent } from './components/PrikazKomponente/profil-instruktor/profil-instruktor.component';
import { ProfilKlijentComponent } from './components/PrikazKomponente/profil-klijent/profil-klijent.component';
import { VezbaComponent } from './components/PrikazKomponente/vezba/vezba.component';
import { DodajVezbuComponent } from './components/DodajKomponente/dodaj-vezbu/dodaj-vezbu.component';
import { HranaComponent } from './components/PrikazKomponente/hrana/hrana.component';
import { DodajHranuComponent } from './components/DodajKomponente/dodaj-hranu/dodaj-hranu.component';
import { DodajPlanTreningaComponent } from './components/DodajKomponente/dodaj-plan-treninga/dodaj-plan-treninga.component';
import { DodajPlanIshraneComponent } from './components/DodajKomponente/dodaj-plan-ishrane/dodaj-plan-ishrane.component';
import { PlanIshraneComponent } from './components/PrikazKomponente/plan-ishrane/plan-ishrane.component';
import { PlanTreningaComponent } from './components/PrikazKomponente/plan-treninga/plan-treninga.component';
import { HomeComponent } from './components/PrikazKomponente/home/home.component';
import { NavigationComponent } from './components/PrikazKomponente/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfilInstruktorComponent,
    ProfilKlijentComponent,
    VezbaComponent,
    DodajVezbuComponent,
    HranaComponent,
    DodajHranuComponent,
    DodajPlanTreningaComponent,
    DodajPlanIshraneComponent,
    PlanIshraneComponent,
    PlanTreningaComponent,
    HomeComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
