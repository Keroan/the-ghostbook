import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from '../auth.service';
import { StorageService } from "../storage.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit{

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {
    if(this.storageService.isLoggedIn()){
      this.router.navigate(["/profile"]);
    }
  }

  onRegister(form: NgForm) {

    if (form.invalid) {
      return;
    }

    const username = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    const role = form.value.role;
    this.authService.register(username, email, password, role).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.storageService.saveUser(data);
        this.router.navigate(["/profile"]);
      },
      error: err => {
        this.isSignUpFailed = true;
        this.errorMessage = err.error.message;
      }
    });
  }

}
