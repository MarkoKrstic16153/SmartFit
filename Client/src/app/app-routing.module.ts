import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './components/PrikazKomponente/navigation/navigation.component';
import { LoginComponent } from './components/PrijavaKomponente/login/login.component';
import { SignupComponent } from './components/PrijavaKomponente/signup/signup.component';
import { ProfilKlijentComponent } from './components/PrikazKomponente/profil-klijent/profil-klijent.component';
import { ProfilInstruktorComponent } from './components/PrikazKomponente/profil-instruktor/profil-instruktor.component';
import { VezbaComponent } from './components/PrikazKomponente/vezba/vezba.component';
import { DodajVezbuComponent } from './components/DodajKomponente/dodaj-vezbu/dodaj-vezbu.component';
import { DodajHranuComponent } from './components/DodajKomponente/dodaj-hranu/dodaj-hranu.component';
import { DodajPlanIshraneComponent } from './components/DodajKomponente/dodaj-plan-ishrane/dodaj-plan-ishrane.component';
import { DodajPlanTreningaComponent } from './components/DodajKomponente/dodaj-plan-treninga/dodaj-plan-treninga.component';


const routes: Routes = [
  { path: "dodajplanishrane/:data", component: DodajPlanIshraneComponent },
  { path: "dodajplantreninga/:data", component: DodajPlanTreningaComponent },
  { path: "dodajhranu", component: DodajHranuComponent },
  { path: "dodajvezbu", component: DodajVezbuComponent },
  { path: "vezba/:ime", component: VezbaComponent },
  { path: "profilinstruktor/:username", component: ProfilInstruktorComponent },
  { path: "vidiinstruktor/:username", component: ProfilInstruktorComponent },
  { path: "profilklijent/:username", component: ProfilKlijentComponent },
  { path: "vidiklijent/:username", component: ProfilKlijentComponent },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "", component: NavigationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
