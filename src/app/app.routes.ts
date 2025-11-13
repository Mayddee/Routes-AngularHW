import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ItemsListComponent } from './components/pages/items-list/items-list.component';
import { ItemDetailsComponent } from './components/pages/item-details/item-details.component';

export const routes: Routes = [
   { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },

  
  { path: 'items', component: ItemsListComponent },
  { path: 'items/:name', component: ItemDetailsComponent },

  { path: '**', redirectTo: '' },
];