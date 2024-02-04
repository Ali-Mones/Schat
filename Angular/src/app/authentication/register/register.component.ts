import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { countryList } from './countries';
import { AuthenticationApiService } from '../services/authentication-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  countries = countryList;

  passwordStrengthValidator: ValidatorFn =  (control: AbstractControl) =>
  /[A-Z]+/.test(control.value) &&  /[a-z]+/.test(control.value) && /[0-9]+/.test(control.value) ? null : { weakPassword: true };

  passwordMatchValidator: ValidatorFn = (control: AbstractControl) => 
    this.form.get("confirmPassword")?.value === this.form.get("password")?.value ? null : { passwordMismatch: true };

  birthDateValidator: ValidatorFn = (control: AbstractControl) =>
    new Date(control.value) < new Date() ? null : { invalidDate: true };

  nationalityValidator: ValidatorFn = (control: AbstractControl) =>
    control.value !== "nationality" ? null : { invalidNationality: true };

  genderValidator: ValidatorFn = (control: AbstractControl) => 
    control.value !== "gender" ? null : { invalidGender: true };

  form: FormGroup = new FormGroup({
    firstName: new FormControl<string>('', { validators: [Validators.required, Validators.maxLength(255)] }),
    lastName: new FormControl<string>('', { validators: [Validators.required, Validators.maxLength(255)] }),
    birthDate: new FormControl<Date | null>(null, { validators: [Validators.required, this.birthDateValidator] }),
    nationality: new FormControl<string>('nationality', { validators: [Validators.required, this.nationalityValidator] }),
    gender: new FormControl<string | number>('gender', { validators: [Validators.required, this.genderValidator] }),
    email: new FormControl<string>('', { validators: [Validators.required,  Validators.maxLength(256)] }),
    password: new FormControl<string>('', { validators: [Validators.required, Validators.minLength(8), this.passwordStrengthValidator] }),
    confirmPassword: new FormControl<string>('', { validators: [Validators.required] })
  });

  constructor(private api: AuthenticationApiService, private router: Router) { }
  
  ngOnInit(): void {
    this.form.get("confirmPassword")?.addValidators(this.passwordMatchValidator);
  }

  handleRegister() {
    if (!this.form.valid) {
      alert("Invalid Form");
      return;
    }

    this.form.get("gender")?.setValue(parseInt(this.form.get("gender")?.value));
    this.form.get("confirmPassword")?.disable();

    this.api.register(this.form.value).pipe(catchError((err) => {
      if (err.status == 0) {
        console.error('An error occurred:', err.error);
      } else {
        alert(err.error);
      }
      return err;
    })).subscribe(() => {
      alert("registered successfully!");
      this.router.navigateByUrl('/login')
    });
  }
}
