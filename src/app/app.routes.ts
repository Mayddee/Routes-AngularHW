import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ItemsListComponent } from './components/pages/items-list/items-list.component';
import { ItemDetailsComponent } from './components/pages/item-details/item-details.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: 'items',
    loadComponent: () =>
      import('./components/pages/items-list/items-list.component')
        .then(m => m.ItemsListComponent)
  },

  {
    path: 'items/:index',
    loadComponent: () =>
      import('./components/pages/item-details/item-details.component')
        .then(m => m.ItemDetailsComponent)
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },

  { path: '**', redirectTo: '' }
];

