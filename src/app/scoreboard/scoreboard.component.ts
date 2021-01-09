import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {MainService} from "../shared/main.service";
import {Observable} from "rxjs";
import {GroupModel} from "../models/group.model";

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  selectedIndex: number;
  open: boolean = null;

  constructor(public main: MainService) { }

  async ngOnInit(): Promise<void> {
    await this.main.getGroups();

    await this.main.getAchievements();

    await this.main.getAdministration();
    this.main.administration.forEach(value => {
      this.open = value[0].open;
    });
  }

  openLijst(index: number): void {
    if (this.selectedIndex === index){
      this.selectedIndex = null;
    } else {
      this.selectedIndex = index;
    }
  }
}
