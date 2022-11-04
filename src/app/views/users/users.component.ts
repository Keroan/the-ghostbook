import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../auth/storage.service';

import { User } from '../users/user.model';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  currentUser: any;
  users: User[] = [];

  constructor(
    private usersService: UsersService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.storageService.getUser()) {
      this.currentUser = this.storageService.getUser();

      this.usersService.getGhosts(this.currentUser.id).subscribe({
        next: (data) => {
          this.users = data.users.map(({ _id, username, role }: any) => ({
            id: _id,
            username: username,
            role: role,
          }));
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  onAddFriend(friendId: string) {

    this.currentUser.friends.push(friendId);

    this.usersService.updateUser(this.currentUser.id, this.currentUser.role, this.currentUser.friends).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.router.navigate(["/profile"]);
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
