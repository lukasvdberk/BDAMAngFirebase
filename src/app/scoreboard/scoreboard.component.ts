import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {MainService} from '../shared/main.service';

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
      for (const i of value){
        if (i.payload.doc.id === 'status'){
          this.open = i.payload.doc.data().open;
        } else if (i.payload.doc.id === 'melding'){
          if (i.payload.doc.data().text !== ''){
            Swal.fire({
              icon: 'info',
              title: 'Melding',
              text: i.payload.doc.data().text,
              position: 'top-end',
              confirmButtonText: 'Oke',
              backdrop: false
            });
          }
        }
      }
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
