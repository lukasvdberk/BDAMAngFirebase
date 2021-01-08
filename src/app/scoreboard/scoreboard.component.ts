import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  array = [1,2,3,4,5,6,7,8,9,10];
  selectedIndex: number;

  constructor() { }

  ngOnInit(): void {
  }

  openLijst(i: number, index: number): void {
    this.selectedIndex = index;
  }
}
