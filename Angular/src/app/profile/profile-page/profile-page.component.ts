import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/User';
import { Gender } from '../models/Gender';
import { getMonthName } from '../models/Months';
import { getGenderString } from '../models/Gender';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  @Input()
  user!: User;

  constructor() { }

  ngOnInit(): void {
  }

  getMonthName(monthNumber: number) {
    return getMonthName(monthNumber);
  }

  getGenderString(gender: Gender) {
    return getGenderString(gender);
  }

}
