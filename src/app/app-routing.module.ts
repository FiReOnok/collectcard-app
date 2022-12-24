import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardsComponent } from './cards/cards.component';
import { CardsAddComponent } from './cards-add/cards-add.component';
import { CardsGetComponent } from './cards-get/cards-get.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CollectionsComponent } from './collections/collections.component';
import { CollectionDetailsComponent } from './collection-details/collection-details.component';
import { CollectionAddComponent } from './collection-add/collection-add.component';

import { AuthGuard } from './auth.guard';





const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'cards/add', component: CardsAddComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'cards/get', component: CardsGetComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'cards', component: CardsComponent, pathMatch: 'full' },
  { path: 'collections', component: CollectionsComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'collections/add', component: CollectionAddComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'collections/:id', component: CollectionDetailsComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
