import { Component, Input, OnInit } from '@angular/core';
import { User } from '../profile/models/User';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  activeChat: { from: number, to: User } | null = null;

  @Input()
  activeProfile: User | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  handleChangeProfile(user: User) {
    this.activeChat = null;
    this.activeProfile = user;
  }

  handleChatChange(chat: { from: number, to: User }) {
    this.activeChat = chat;
    this.activeProfile = null;
  }
}
