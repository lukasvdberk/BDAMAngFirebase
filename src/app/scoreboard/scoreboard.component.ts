import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {MainService} from "../shared/main.service";
import {Observable} from "rxjs";
import {GroupModel} from "../models/group.model";

// const getGroups: Observable<GroupModel[]>;

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  group: Observable<GroupModel[]>;

  selectedIndex: number;

  constructor(public main: MainService) { }

  async ngOnInit(): Promise<void> {
    await this.main.getGroups();
    this.group = this.main.group;
  }

  openLijst(i: number, index: number): void {
    if (this.selectedIndex === index){
      this.selectedIndex = null;
    } else {
      this.selectedIndex = index;
    }
  }
}
