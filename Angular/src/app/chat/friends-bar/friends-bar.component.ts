import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationApiService } from 'src/app/authentication/services/authentication-api.service';
import { catchError, throwError } from 'rxjs';
import { User } from '../models/User';
import { UsersApiService } from '../services/users-api.service';

@Component({
  selector: 'app-friends-bar',
  templateUrl: './friends-bar.component.html',
  styleUrls: ['./friends-bar.component.css']
})
export class FriendsBarComponent implements OnInit {

  friends: User[] = []

  @Output()
  onChatChange = new EventEmitter<{ from: number, to: User }>();

  constructor(
    private authenticationApi: AuthenticationApiService,
    private usersApi: UsersApiService
  ) { }

  ngOnInit(): void {
    this.usersApi.getFriends()
      .pipe(catchError((err) => {
        alert(err.error);
        return throwError(() => new Error());
      }))
      .subscribe((friends) => {
        this.friends = friends;
      });
  }

  handleChangeChat(to: User) {
    this.authenticationApi.id()
      .pipe(catchError((err) => {
        alert(err.error);
        return throwError(() => new Error());
      }))
      .subscribe((from) => {
        this.onChatChange.emit({ from: from, to: to });
      });
  }
}
