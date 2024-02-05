import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  private url = "http://localhost:5252/api/Users";
  private headers = {
    'Content-Type': 'application/json'
  };

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url, { headers: this.headers, withCredentials: true });
  }

  getFriends(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/friends`, { headers: this.headers, withCredentials: true });
  }

  addFriend(id: number): Observable<void> {
    return this.http.post<void>(`${this.url}/add-friend/${id}`, {}, { headers: this.headers, withCredentials: true });
  }
}
