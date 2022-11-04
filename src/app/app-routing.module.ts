import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './views/index/index/index.component';

// layouts
import { AuthComponent } from "./layouts/auth/auth.component";

// views
import { ProfileOverviewComponent } from "./views/profile/profile-overview/profile-overview.component";
import { ProfileModifyComponent } from "./views/profile/profile-modify/profile-modify.component"
import { UsersComponent } from "./views/users/users.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

const routes: Routes = [
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  // no layout views
  { path: "profile/modify", component: ProfileModifyComponent },
  { path: "profile", component: ProfileOverviewComponent },
  { path: "users", component: UsersComponent },
  { path: "", component: IndexComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
