import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationApiService } from '../authentication/services/authentication-api.service';
import { catchError, throwError } from 'rxjs';
import { UsersApiService } from '../chat/services/users-api.service';
import { User } from '../profile/models/User';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {

  @Output()
  private profileEvent = new EventEmitter<User>();

  constructor(
    private router: Router,
    private authApi: AuthenticationApiService,
    private usersApi: UsersApiService
  ) { }

  ngOnInit(): void {
  }

  handleHomePageClick() {
    this.router.navigateByUrl('/chat-page');
  }

  handleLogout() {
    this.authApi.logout()
      .pipe(catchError((err) => {
        alert(err.error);
        return throwError(() => new Error());
      }))
      .subscribe(() => {
        this.router.navigateByUrl('/login');
      });
  }

  handleProfile() {
    this.usersApi.getSelf()
      .pipe(catchError((err) => {
        alert(err.error);
        return throwError(() => new Error());
      }))
      .subscribe((self) => {
        self.birthDate = new Date(self.birthDate!);
        this.profileEvent.emit(self);
      });
  }
}
