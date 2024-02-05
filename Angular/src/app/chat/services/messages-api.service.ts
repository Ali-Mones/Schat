import { Injectable } from '@angular/core';
import { Message } from '../models/Message';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesApiService {

  private url = "http://localhost:5252/api/Messages";
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private http: HttpClient
  ) { }

  sendMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.url, JSON.stringify(message), { headers: this.headers, withCredentials: true });
  }

  getMessagesBetween(user1: number, user2: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.url}/between/${user1}/${user2}`, { headers: this.headers, withCredentials: true });
  }
}
