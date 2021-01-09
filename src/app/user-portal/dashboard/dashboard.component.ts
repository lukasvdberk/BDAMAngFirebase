import { Component, OnInit } from '@angular/core';
import {MainService} from '../../shared/main.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  open: boolean = null;

  constructor(public main: MainService) { }

  async ngOnInit(): Promise<void> {
    await this.main.getAdministration();
    this.main.administration.forEach(value => {
      this.open = value[0].open;
    });
  }

}
