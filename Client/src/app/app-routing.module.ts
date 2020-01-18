import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationComponent } from './components/PrikazKomponente/navigation/navigation.component';
import { LoginComponent } from './components/PrijavaKomponente/login/login.component';
import { SignupComponent } from './components/PrijavaKomponente/signup/signup.component';
import { ProfilKlijentComponent } from './components/PrikazKomponente/profil-klijent/profil-klijent.component';
import { ProfilInstruktorComponent } from './components/PrikazKomponente/profil-instruktor/profil-instruktor.component';
import { VezbaComponent } from './components/PrikazKomponente/vezba/vezba.component';


const routes: Routes = [
  { path: "vezba/:ime", component: VezbaComponent },
  { path: "profilinstruktor/:username", component: ProfilInstruktorComponent },
  { path: "profilklijent/:username", component: ProfilKlijentComponent },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "", component: NavigationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
