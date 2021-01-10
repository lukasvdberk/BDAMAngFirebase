import { Component, OnInit } from '@angular/core';
import {MainService} from '../../shared/main.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  open: boolean = null
  melding: string = null;

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
          this.melding = i.payload.doc.data().text;
        }
      }
    });
  }

  async maakMelding(): Promise<void> {
    if (this.melding === ''){
      await Swal.fire({
        title: 'Nieuwe melding',
        input: 'text',
        inputPlaceholder: 'Vul met een nieuwe melding...',
        confirmButtonText: 'Oke'
      }).then(async (result) => {
        await this.main.db.collection('administratie').doc('melding').set({text: result.value});
        this.main.createSimpleNotification('success', 'Melding aangemaakt!');
      });
    } else {
      this.main.createSimpleNotification('error', 'Er is al een melding actief!');
    }
  }

  async verwijderMelding(): Promise<void> {
    if (this.melding !== ''){
      await this.main.db.collection('administratie').doc('melding').update({text: ''});
      this.main.createSimpleNotification('success', 'Melding verwijderd!');
    } else {
      this.main.createSimpleNotification('error', 'Er bestaat geen melding!');
    }
  }

  async createNewGroup(): Promise<void> {
    await Swal.fire({
      title: 'Nieuwe groep',
      input: 'number',
      inputPlaceholder: 'Groepsnummer',
      confirmButtonText: 'Oke'
    }).then(result => {
      if (result.value !== '' && result.isConfirmed){
        const data = {
          achievements: [],
          groepsnummer: result.value,
          punten: 0
        };
        this.main.db.collection('groepen').add(data).then(res => {
          this.main.createSimpleNotification('success', `Groep ${result.value} aangemaakt!`);
        });
      } else {
        this.main.createSimpleNotification('error', 'Je hebt geen waarde opgegeven');
      }
    });
  }

  async verwijderGroep(): Promise<void> {
    await Swal.fire({
      title: 'Verwijder groep',
      input: 'number',
      inputPlaceholder: 'Groepsnummer',
      confirmButtonText: 'Oke'
    }).then(async result => {
      if (result.value !== ''){
        await this.main.group.forEach(value => {
          for (const i of value){
            if (result.value === i.payload.doc.data().groepsnummer){
              this.main.db.collection('groepen').doc(i.payload.doc.id).delete().then( res => {
                this.main.createSimpleNotification('success', `Groep ${result.value} verwijderd!`);
              });
            }
          }
        });
      } else {
        await this.main.createSimpleNotification('error', 'Je hebt geen waarde opgegeven');
      }
    });
  }
}
