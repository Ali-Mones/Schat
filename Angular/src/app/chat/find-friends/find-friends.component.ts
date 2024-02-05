import { Component, OnInit } from '@angular/core';
import { UsersApiService } from '../services/users-api.service';
import { User } from '../models/User';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-find-friends',
  templateUrl: './find-friends.component.html',
  styleUrls: ['./find-friends.component.css'],
})
export class FindFriendsComponent implements OnInit {
  users: User[] = [];

  searchTimeout!: NodeJS.Timeout;

  constructor(
    private usersApi: UsersApiService
  ) { }

  ngOnInit(): void {
    this.usersApi.getAllUsers()
      .subscribe((users) => {
        this.users = users;
      });
  }

  handleSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    const timeout = 500;
    this.searchTimeout = setTimeout(() => {
      if (value === '') {
        this.usersApi.getAllUsers()
          .subscribe((users) => {
            this.users = users;
          });
      } else {
        // call api here for users that match the value
      }
    }, timeout);
  }

  handleAddFriend(user: User) {
    this.usersApi.addFriend(user.id)
      .pipe(catchError((err) => {
        alert(err.error);
        return throwError(() => new Error());
      }))
      .subscribe(() => {
        location.reload();
      });
  }
}
