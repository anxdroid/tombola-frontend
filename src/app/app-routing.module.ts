import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartelleComponent } from './cartelle/cartelle.component';
import { CartelloneComponent } from './cartellone/cartellone.component';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { SessioneComponent } from './sessione/sessione.component';
import { AuthGuard } from './_helpers';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cartellone/:sessionId', component: CartelloneComponent, canActivate: [AuthGuard]  },
  { path: 'cartelle/:sessionId', component: CartelleComponent, canActivate: [AuthGuard]  },
  { path: 'sessione', component: SessioneComponent, canActivate: [AuthGuard]  },


  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
