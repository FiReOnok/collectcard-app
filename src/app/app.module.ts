import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

// Material Design
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatInputModule, MatMenuModule,
  MatToolbarModule,
  MatSelectModule,
  MatDividerModule,
} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CardsComponent } from './cards/cards.component';
import { CardsAddComponent } from './cards-add/cards-add.component';
import { CardsGetComponent } from './cards-get/cards-get.component';
import { CollectionsComponent } from './collections/collections.component';
import { CollectionDetailsComponent } from './collection-details/collection-details.component';
import { CollectionAddComponent } from './collection-add/collection-add.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AuthService } from './_services/auth.service';
import { UsersService } from './_services/users.service';
import { CardsService } from './_services/cards.service';
import { CollectionsService } from './_services/collections.service';
import { TokenInterceptorService } from './_services/token-interceptor.service';

import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    CardsComponent,
    HomeComponent,
    PageNotFoundComponent,
    CollectionsComponent,
    CollectionDetailsComponent,
    ProfileComponent,
    CollectionAddComponent,
    CardsAddComponent,
    CardsGetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule
  ],
  providers: [AuthService, AuthGuard, CardsService, CollectionsService, UsersService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
