import { Component, OnInit } from '@angular/core';
import {MainService} from '../../shared/main.service';
import Swal from 'sweetalert2';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  open: boolean = null;
  melding: string = null;

  constructor(public main: MainService, private db: AngularFirestore) { }

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

  maakMelding(): void {
    if (this.melding === ''){
      Swal.fire({
        title: 'Nieuwe melding',
        input: 'text',
        inputPlaceholder: 'Vul met een nieuwe melding...',
        confirmButtonText: 'Oke'
      }).then(async (result) => {
        await this.db.collection('administratie').doc('melding').set({text: result.value});
        this.main.createSimpleNotification('success', 'Melding aangemaakt!');
      });
    } else {
      this.main.createSimpleNotification('error', 'Er is al een melding actief!');
    }
  }

  async verwijderMelding(): Promise<void> {
    if (this.melding !== ''){
      await this.db.collection('administratie').doc('melding').update({text: ''});
      this.main.createSimpleNotification('success', 'Melding verwijderd!');
    } else {
      this.main.createSimpleNotification('error', 'Er bestaat geen melding!');
    }
  }

  createNewGroup(): void {
    Swal.fire({
      title: 'Nieuwe groep',
      input: 'number',
      inputPlaceholder: 'Groepsnummer',
      confirmButtonText: 'Oke'
    }).then(async result => {
      if (result.value !== '' && result.isConfirmed){
        const docRef = this.db.collection('groepen').doc(result.value);
        await docRef.get().forEach( (doc) => {
          if (doc.exists){
            this.main.createSimpleNotification('error', `Groep ${result.value} bestaat al!`);
          } else {
            const groupData = {
              achievements: [],
              punten: 0
            };
            this.db.collection('groepen').doc(result.value).set(groupData).then(res => {
              this.main.createSimpleNotification('success', `Groep ${result.value} aangemaakt!`);
            });
          }
        });
      }
    });
  }

  verwijderGroep(): void {
    Swal.fire({
      title: 'Verwijder groep',
      input: 'number',
      inputPlaceholder: 'Groepsnummer',
      confirmButtonText: 'Oke'
    }).then(async result => {
      if (result.value !== '' && result.isConfirmed) {
        const docRef = this.db.collection('groepen').doc(result.value);
        await docRef.get().forEach((doc) => {
          if (doc.exists) {
            this.db.collection('groepen').doc(doc.id).delete().then( () => {
              this.main.createSimpleNotification('success', `Groep ${result.value} verwijderd!`);
            });
          } else {
            this.main.createSimpleNotification('error', `Groep ${result.value} bestaat niet!!`);
          }
        });
      }
    });
  }
}
