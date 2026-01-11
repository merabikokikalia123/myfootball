import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErorComponent } from './eror/eror.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  {
    path: 'players',
    loadComponent: () =>
      import('./all-players/all-players.component').then(
        (m) => m.AllPlayersComponent
      ),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },

  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./forgotpass/forgotpass.component').then(
        (m) => m.ForgotPasswordComponent
      ),
  },

  {
    path: 'reset-password',
    loadComponent: () =>
      import('./reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent
      ),
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
  },

  {
    path: 'premium',
    loadComponent: () =>
      import('./premium/premium.component').then((m) => m.PremiumComponent),
  },

  {
    path: 'scouting-football',
    canMatch: [adminGuard],
    loadComponent: () =>
      import('./scouting-football/scouting-football.component').then(
        (m) => m.ScoutingFootballComponent
      ),
  },

  {
    path: 'scouting-basketball',
    canMatch: [adminGuard],
    loadComponent: () =>
      import('./scouting-basketball/scouting-basketball.component').then(
        (m) => m.ScoutingBasketballComponent
      ),
  },

  {
    path: 'scouting-judo',
    canMatch: [adminGuard],
    loadComponent: () =>
      import('./scouting-judo/scouting-judo.component').then(
        (m) => m.ScoutingJudoComponent
      ),
  },

  {
    path: 'scouting-mma',
    canMatch: [adminGuard],
    loadComponent: () =>
      import('./scouting-mma/scouting-mma.component').then(
        (m) => m.ScoutingMmaComponent
      ),
  },

  {
    path: 'profile',
    canMatch: [authGuard],
    loadComponent: () =>
      import('./profile/profile.component').then((m) => m.ProfileComponent),
  },

  { path: '**', component: ErorComponent },
];
