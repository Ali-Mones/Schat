import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationApiService } from '../services/authentication-api.service';
import { catchError, retry, throwError, throwIfEmpty } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private api: AuthenticationApiService) { }

  form: FormGroup = new FormGroup({
    email: new FormControl<string>('', { validators: [Validators.required] }),
    password: new FormControl<string>('', { validators: [Validators.required] })
  });

  ngOnInit(): void {
  }

  handleLogin(event: Event) {
    event.preventDefault();

    if (!this.form.controls["email"].valid) {
      alert("Email is required");
    } else {
      this.api.login(this.form.value)
        .pipe(retry(0), catchError((err) => {
          alert(err.error);
          return throwError(() => new Error());
        }))
        .subscribe(() => this.router.navigateByUrl(''));
    }
  }

  handleRegsiter() {
    this.router.navigateByUrl('/register');
  }
}
