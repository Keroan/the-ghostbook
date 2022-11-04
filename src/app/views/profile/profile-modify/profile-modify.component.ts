import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../users/users.service';
import { StorageService } from '../../auth/storage.service';

@Component({
  selector: 'app-profile-modify',
  templateUrl: './profile-modify.component.html',
})
export class ProfileModifyComponent implements OnInit {
  currentUser: any;
  roles: string[] = [
    'alchimiste',
    'enchanteur',
    'espion',
    'guerrier',
    'sorcier',
  ];

  roleForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    if (this.storageService.getUser()) {
      this.currentUser = this.storageService.getUser();

      this.roleForm = this.fb.group({
        role: this.currentUser.role,
      });
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  onSubmit() {
    this.usersService.updateUser(this.currentUser.id, this.roleForm.value.role, this.currentUser.friends).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.router.navigate(["/profile"]);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        this.storageService.clean();
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
