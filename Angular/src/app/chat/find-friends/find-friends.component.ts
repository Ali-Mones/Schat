import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsersApiService } from '../services/users-api.service';
import { User } from '../../profile/models/User';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-find-friends',
  templateUrl: './find-friends.component.html',
  styleUrls: ['./find-friends.component.css'],
})
export class FindFriendsComponent implements OnInit {
  users: User[] = [];

  searchTimeout!: NodeJS.Timeout;

  @Output()
  onProfileChange = new EventEmitter<User>();

  constructor(
    private usersApi: UsersApiService
  ) { }

  ngOnInit(): void {
    this.usersApi.getAllUsersNoSelf()
      .subscribe((users) => {
        this.users = users.map((user) => {
          return { ...user, birthDate: new Date(user.birthDate!) }
        });
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
        this.usersApi.getAllUsersNoSelf()
          .subscribe((users) => {
            this.users = users.map((user) => {
              return { ...user, birthDate: new Date(user.birthDate!) }
            });
          });
      } else {
        this.usersApi.search(value)
          .subscribe((users) => {
            this.users = users.map((user) => {
              return { ...user, birthDate: new Date(user.birthDate!) }
            });
          });
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
