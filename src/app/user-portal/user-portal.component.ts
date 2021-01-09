import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-portal',
  templateUrl: './user-portal.component.html',
  styleUrls: ['./user-portal.component.css']
})
export class UserPortalComponent implements OnInit {
  login = false;

  constructor() { }

  ngOnInit(): void {
  }

  switchView(): void {
    this.login = !this.login;
  }
}
