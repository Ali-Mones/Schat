import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from '../models/Message';

@Component({
  selector: 'app-chat-instance',
  templateUrl: './chat-instance.component.html',
  styleUrls: ['./chat-instance.component.css']
})
export class ChatInstanceComponent implements OnInit, AfterViewChecked {
  @Input()
  from: number = 0;

  @Input()
  to: number = 1;

  @ViewChild('chatBox')
  chatBox!: ElementRef<HTMLTextAreaElement>;

  @ViewChild('chat')
  chatDiv!: ElementRef<HTMLDivElement>;

  @ViewChild('sendButton')
  sendButton!: ElementRef<HTMLButtonElement>;

  @Input()
  messages: Message[] = [
    { id: 1, text: "Hello alice", from: 0, to: 1, date: new Date() },
    { id: 2, text: "Hi bob", from: 1, to: 0, date: new Date() },
    { id: 3, text: "how are you alice ?", from: 0, to: 1, date: new Date() },
    { id: 4, text: "i am fine. hbu bob ?", from: 1, to: 0, date: new Date() },
    { id: 5, text: "i am doing well, alice, thanks for asking", from: 0, to: 1, date: new Date() },
    { id: 1, text: "Hello alice", from: 0, to: 1, date: new Date() },
    { id: 2, text: "Hi bob", from: 1, to: 0, date: new Date() },
    { id: 3, text: "how are you alice ?", from: 0, to: 1, date: new Date() },
    { id: 4, text: "i am fine. hbu bob ?", from: 1, to: 0, date: new Date() },
    { id: 5, text: "i am doing well, alice, thanks for asking", from: 0, to: 1, date: new Date() },
    { id: 1, text: "Hello alice", from: 0, to: 1, date: new Date() },
    { id: 2, text: "Hi bob", from: 1, to: 0, date: new Date() },
    { id: 3, text: "how are you alice ?", from: 0, to: 1, date: new Date() },
    { id: 4, text: "i am fine. hbu bob ?", from: 1, to: 0, date: new Date() },
    { id: 5, text: "i am doing well, alice, thanks for asking", from: 0, to: 1, date: new Date() },
    { id: 1, text: "Hello alice", from: 0, to: 1, date: new Date() },
    { id: 2, text: "Hi bob", from: 1, to: 0, date: new Date() },
    { id: 3, text: "how are you alice ?", from: 0, to: 1, date: new Date() },
    { id: 4, text: "i am fine. hbu bob ?", from: 1, to: 0, date: new Date() },
    { id: 5, text: "i am doing well, alice, thanks for asking", from: 0, to: 1, date: new Date() },
  ];

  constructor() { }

  ngAfterViewChecked() {
    this.chatDiv.nativeElement.scrollTop = this.chatDiv.nativeElement.scrollHeight;
  }

  ngOnInit(): void {
  }

  handleKeyDown(e: any) {
    if (e.key == 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.sendButton.nativeElement.click();
    }
  }

  handleInput() {
    if (this.chatBox.nativeElement.scrollHeight != this.chatBox.nativeElement.clientHeight) {
      this.chatBox.nativeElement.style.height = '';
      this.chatBox.nativeElement.style.height = this.chatBox.nativeElement.scrollHeight + 'px';
      this.chatBox.nativeElement.value = this.chatBox.nativeElement.value.trimStart();
    } else if (this.chatBox.nativeElement.value == '') {
      this.chatBox.nativeElement.style.height = '';
    }
  }

  handleSendMessage() {
    if (this.chatBox.nativeElement.value.trim() == '') {
      return;
    }

    this.messages.push({
      id: this.messages.length + 1,
      text: this.chatBox.nativeElement.value.trim(),
      from: this.from,
      to: this.to,
      date: new Date()
    });

    this.chatBox.nativeElement.value = '';
    this.chatBox.nativeElement.style.height = '';
    this.chatDiv.nativeElement.scrollBy(0, this.chatDiv.nativeElement.clientHeight);
  }
}
