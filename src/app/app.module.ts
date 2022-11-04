import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// font awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// layouts
import { AuthComponent } from "./layouts/auth/auth.component";

// views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";
import { ProfileOverviewComponent } from "./views/profile/profile-overview/profile-overview.component";
import { ProfileModifyComponent } from "./views/profile/profile-modify/profile-modify.component"

// components
import { IndexComponent } from './views/index/index/index.component';
import { AuthNavbarComponent } from "./components/navbars/auth-navbar/auth-navbar.component";
import { IndexNavbarComponent } from "./components/navbars/index-navbar/index-navbar.component";
import { FooterComponent } from "./components/footers/footer/footer.component";
import { FooterSmallComponent } from "./components/footers/footer-small/footer-small.component";

// material design
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { httpInterceptorProviders } from './views/auth/http.interceptor';
import { UsersComponent } from './views/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    IndexNavbarComponent,
    FooterComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    FooterSmallComponent,
    AuthNavbarComponent,
    ProfileOverviewComponent,
    UsersComponent,
    ProfileModifyComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [httpInterceptorProviders, { provide: LOCALE_ID, useValue: 'fr-FR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
