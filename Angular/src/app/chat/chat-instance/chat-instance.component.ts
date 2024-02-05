import { AfterViewChecked, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Message } from '../models/Message';
import { MessagesApiService } from 'src/app/chat/services/messages-api.service';
import { catchError, throwError } from 'rxjs';
import { User } from '../models/User';

@Component({
  selector: 'app-chat-instance',
  templateUrl: './chat-instance.component.html',
  styleUrls: ['./chat-instance.component.css']
})
export class ChatInstanceComponent implements OnInit, AfterViewChecked, OnChanges {
  @Input()
  from!: number | null;

  @Input()
  to!: User | null;

  @ViewChild('chatBox')
  chatBox!: ElementRef<HTMLTextAreaElement>;

  @ViewChild('chat')
  chatDiv!: ElementRef<HTMLDivElement>;

  @ViewChild('sendButton')
  sendButton!: ElementRef<HTMLButtonElement>;

  messages: Message[] = [];

  constructor(
    private api: MessagesApiService
  ) { }

  ngAfterViewChecked() {
    if (this.chatDiv) {
      this.chatDiv.nativeElement.scrollTop = this.chatDiv.nativeElement.scrollHeight;
    }
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['from'] && !changes['to'] || !this.from || !this.to) {
      return;
    }

    let from = changes['from']?.currentValue;
    if (!changes['from']) {
      from = this.from;
    }
    const to = changes['to']?.currentValue.id;

    this.api.getMessagesBetween(from, to)
      .pipe(catchError((err) => {
        alert(err.error);
        return throwError(() => new Error());
      }))
      .subscribe((messages) => {
        this.messages = messages.map((message) => { return { ...message, date: new Date(message.date) } });
      });
  }

  handleKeyDown(e: KeyboardEvent) {
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

    this.api.sendMessage({
      id: 0,
      text: this.chatBox.nativeElement.value.trim(),
      from: this.from!,
      to: this.to?.id!,
      date: new Date()
    })
      .pipe(catchError((err) => {
        alert(err.error);
        return throwError(() => new Error());
      }))
      .subscribe(message => {
        message.date = new Date(message.date);
        this.messages.push(message);
        this.chatBox.nativeElement.value = '';
        this.chatBox.nativeElement.style.height = '';
      });
  }
}
