import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastStatus } from './ToastStatus';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  @Input()
  status: ToastStatus = ToastStatus.Success;

  @Input()
  message: string = "";

  @Input()
  timeout: number = 1000;

  @Output()
  shownEvent: EventEmitter<boolean> = new EventEmitter();

  shown: boolean = true;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.shown = false;
      this.shownEvent.emit(false);
    }, this.timeout);
  }
}
