import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  form: FormGroup = new FormGroup({
    email: new FormControl<string>('', { validators: [Validators.required] }),
    password: new FormControl<string>('', { validators: [Validators.required] })
  });

  ngOnInit(): void {
  }

  handleLogin() {
    if (!this.form.controls["email"].valid) {
      alert("Email is required");
    } else {
      alert("Email is valid");
    }
  }

  handleRegsiter() {
    this.router.navigate(['/register']);
  }
}
