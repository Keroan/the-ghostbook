import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from '../auth.service';
import { StorageService } from '../storage.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {
    if(this.storageService.isLoggedIn()){
      this.router.navigate(["/profile"]);
    }
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authService.login(email, password).subscribe({
      next: data => {
        this.isLoginFailed = false;
        this.storageService.saveUser(data);
        this.router.navigate(["/profile"]);
      },
      error: err => {
        this.isLoginFailed = true;
        this.errorMessage = err.error.message;
      }
    });
  }
}
