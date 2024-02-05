import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
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
    return this.http.post<void>(`${this.url}/login`, JSON.stringify(request), { headers: this.headers, withCredentials: true });
  }

  register(request: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.url}/register`, JSON.stringify(request), { headers: this.headers });
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.url}/logout`, {}, { headers: this.headers, withCredentials: true });
  }

  id(): Observable<number> {
    return this.http.get<number>(`${this.url}/id`, { headers: this.headers, withCredentials: true });
  }
}
