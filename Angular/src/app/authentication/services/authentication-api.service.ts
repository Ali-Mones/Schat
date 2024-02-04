import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../models/RegisterRequest';
import { LoginRequest } from '../models/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApiService {

  url = 'http://localhost:5252/api/Authentication';
  
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }


  login(request: LoginRequest): Observable<void> {
    return this.http.post<void>(`${this.url}/login`, JSON.stringify(request), { headers: this.headers });
  }

  register(request: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.url}/register`, JSON.stringify(request), { headers: this.headers });
  }

}
