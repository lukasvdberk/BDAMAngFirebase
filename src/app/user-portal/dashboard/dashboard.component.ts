import { Component, OnInit } from '@angular/core';
import {MainService} from '../../shared/services/main.service';
import Swal from 'sweetalert2';
import {AngularFirestore} from '@angular/fire/firestore';
import firebase from 'firebase';
import {addWarning} from '@angular-devkit/build-angular/src/utils/webpack-diagnostics';

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

  maakMelding(): void { //TODO DB LOKAAL DONE
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

  async verwijderMelding(): Promise<void> { //TODO DB LOKAAL DONE
    if (this.melding !== ''){
      await this.db.collection('administratie').doc('melding').update({text: ''});
      this.main.createSimpleNotification('success', 'Melding verwijderd!');
    } else {
      this.main.createSimpleNotification('error', 'Er bestaat geen melding!');
    }
  }

  createNewGroup(): void { //TODO DB LOKAAL DONE
    Swal.fire({
      title: 'Nieuwe groep',
      input: 'number',
      inputPlaceholder: 'Groepsnummer',
      confirmButtonText: 'Oke',
      inputValidator: (value) => {
        return value.length > 3 && 'Je mag groepsnummer mag niet uit meer dan 3 karakters bestaan';
      }
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

  verwijderGroep(): void { //TODO DB LOKAAL DONE
    const Json = {};
    this.db.collection('groepen').get().toPromise().then(value => {
      value.forEach(res => {
        Json[res.id] = 'Groep ' + res.id;
      });
      Swal.fire({
        title: 'Verwijder groep',
        input: 'select',
        inputOptions: Json,
        inputPlaceholder: 'Selecteer',
        confirmButtonText: 'Oke',
        cancelButtonText: 'Annuleren',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed){
          this.db.collection('groepen').doc(result.value).delete().then( () => {
            this.main.createSimpleNotification('success', 'Groep verwijderd');
          });
        }
      });
    });
  }

  maakAchievement(): void { //TODO DB LOKAAL DONE
    Swal.fire({
      title: 'Nieuwe achievement',
      html:
        '<label for="swal-input1">Naam</label>' +
        '<input id="swal-input1" class="swal2-input">' +
        '<label for="swal-input2" type="text">Beschrijving</label>' +
        '<input id="swal-input2" class="swal2-input">' +
        '<label for="swal-input3">Icoon Nummer (Pokedex nummer)</label>' +
        '<input id="swal-input3" type="number" class="swal2-input"><br>' +
        '<label for="swal-input4">Punten waard</label><br>' +
        '<input id="swal-input4" type="number" class="swal2-input">',
      focusConfirm: false,
      confirmButtonText: 'Oke',
      preConfirm: () => {
        return [
          (document.getElementById('swal-input1') as HTMLInputElement).value,
          (document.getElementById('swal-input2') as HTMLInputElement).value,
          (document.getElementById('swal-input3') as HTMLInputElement).value,
          Number((document.getElementById('swal-input4') as HTMLInputElement).value)
        ];
      }
    }).then((result) => {
      if (result.isConfirmed){
        const achievementData = {
          naam: result.value[0],
          beschrijving: result.value[1],
          icon: result.value[2],
          punten: result.value[3]
        };
        this.db.collection('achievements').add(achievementData).then((result) => {
          this.main.createSimpleNotification('success', 'Achievement aangemaakt.');
        });
      }
    });
  }

  verwijderAchievement(): void { //TODO DB LOKAAL DONE
    const Json = {};
    this.db.collection('achievements').get().toPromise().then( value => {
      value.forEach(res => {
        Json[res.id] = res.data()['naam'];
      });
      Swal.fire({
          title: 'Selecteer een achievement',
          input: 'select',
          inputOptions: Json,
          inputPlaceholder: 'Selecteer',
          confirmButtonText: 'Oke',
          cancelButtonText: 'Annuleren',
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed){
            this.db.collection('achievements').doc(result.value).delete().then( () => {
              this.main.createSimpleNotification('success', 'Achievement verwijderd');
            });
          }
        });
    });
  }

  koppelAchievement(): void {
    const Json = {};
    let achievementPunt;

    this.db.collection('achievements').get().toPromise().then(querySnapshot => {
      querySnapshot.forEach(i => {
        Json[i.id] = i.data()['naam'];
      });
      Swal.fire({
        title: 'Selecteer een achievement',
        input: 'select',
        inputOptions: Json,
        inputPlaceholder: 'Selecteer',
        confirmButtonText: 'Oke',
        cancelButtonText: 'Annuleren',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.db.collection('achievements').doc(result.value).get().toPromise().then(value => achievementPunt = value.data()['punten']);

          const groepen = {};
          this.db.collection('groepen').get().toPromise().then(querySnapshot2 => {
            querySnapshot2.forEach(res => {
              if (!res.data()['achievements'].includes(result.value)){
                groepen[res.id] = 'Groep ' + res.id;
              }
            });
            Swal.fire({
              title: 'Selecteer een groep',
              input: 'select',
              inputOptions: groepen,
              inputPlaceholder: 'Selecteer',
              confirmButtonText: 'Oke',
              cancelButtonText: 'Annuleren',
              showCancelButton: true,
            }).then((result2) => {
              if (result2.isConfirmed) {
                this.db.collection('groepen').doc(result2.value).update({
                  achievements: firebase.firestore.FieldValue.arrayUnion(result.value),
                  punten: firebase.firestore.FieldValue.increment(achievementPunt)
                }).then(() => {
                  this.main.createSimpleNotification('success', 'Achievement gekoppeld');
                });
              }
            });
          });
        }
      });
    });
  }

  ontKoppelAchievement(): void {
    const groepen = {};
    const groep = [];
    let achievementPunt;

    this.db.collection('groepen').get().toPromise().then(querySnapshot => {
      querySnapshot.forEach(i => {
        groepen[i.id] = 'Groep ' + i.id;
        groep.push(i);
      });
      Swal.fire({
        title: 'Selecteer een groep',
        input: 'select',
        inputOptions: groepen,
        inputPlaceholder: 'Selecteer',
        confirmButtonText: 'Oke',
        cancelButtonText: 'Annuleren',
        showCancelButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const achieveArr = [];
          const Json = {};
          this.db.collection('groepen').doc(result.value).get().toPromise().then(res => {
            achieveArr.push(res.data()['achievements']);
          });
          this.db.collection('achievements').get().toPromise().then(querySnapshot2 => {
            querySnapshot2.forEach(res2 => {
              if (achieveArr[0].includes(res2.id)){
                Json[res2.id] = res2.data()['naam'];
              }
            });
            Swal.fire({
              title: 'Selecteer een achievement',
              input: 'select',
              inputOptions: Json,
              inputPlaceholder: 'Selecteer',
              confirmButtonText: 'Oke',
              cancelButtonText: 'Annuleren',
              showCancelButton: true,
            }).then(async (result2) => {
              await this.db.collection('achievements').doc(result2.value).get().toPromise().then(value => achievementPunt = (value.data()['punten']));
              if (result2.isConfirmed) {
                this.db.collection('groepen').doc(result.value).update({
                  achievements: firebase.firestore.FieldValue.arrayRemove(result2.value),
                  punten: firebase.firestore.FieldValue.increment(-achievementPunt)
                }).then(() => {
                  this.main.createSimpleNotification('success', 'Achievement weggehaald');
                });
              }
            });
          });
        }
      });
    });
  }
}
