import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../profile/models/User';
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

  getAllUsersNoSelf(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/no-self-no-friends`, { headers: this.headers, withCredentials: true });
  }

  getSelf(): Observable<User> {
    return this.http.get<User>(`${this.url}/self`, { headers: this.headers, withCredentials: true });
  }

  search(key: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/search/${key}`, { headers: this.headers, withCredentials: true });
  }

  getFriends(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/friends`, { headers: this.headers, withCredentials: true });
  }

  addFriend(id: number): Observable<void> {
    return this.http.post<void>(`${this.url}/add-friend/${id}`, {}, { headers: this.headers, withCredentials: true });
  }
}
