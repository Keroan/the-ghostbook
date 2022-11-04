import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../users/users.service';
import { StorageService } from '../../auth/storage.service';
import { User } from '../../users/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-overview.component.html',
})
export class ProfileOverviewComponent implements OnInit {
  currentUser: any;
  users: User[] = [];

  constructor(
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    if (this.storageService.getUser()) {
      this.currentUser = this.storageService.getUser();

      this.usersService.getFriends(this.currentUser.id).subscribe({
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

  onGhostFriend(friendId: string) {
    const findIndex = this.users.findIndex((el) => el.id === friendId);
    if (findIndex > -1) {
      this.users.splice(findIndex, 1);
    }

    const index = this.currentUser.friends.indexOf(friendId);
    if (index > -1) {
      this.currentUser.friends.splice(index, 1);
    }

    this.usersService
      .updateUser(
        this.currentUser.id,
        this.currentUser.role,
        this.currentUser.friends
      )
      .subscribe({
        next: (data) => {
          this.storageService.saveUser(data);
        },
        error: (err) => {
          console.log(err);
        },
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
