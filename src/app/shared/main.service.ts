import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from '@angular/fire/firestore';
import {UserModel} from '../models/user.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {GroupModel} from '../models/group.model';
import {AchievementModel} from '../models/achievement.model';
import Swal from 'sweetalert2';

@Injectable()
export class MainService{

  // Gebruikers variabelen
  usersCollection: AngularFirestoreCollection<UserModel>;
  user: Observable<UserModel[]>;

  // Groeps variabelen
  groupCollection: AngularFirestoreCollection<GroupModel>;
  group: Observable<DocumentChangeAction<GroupModel>[]>;

  // Achievements variabelen
  achievementCollection: AngularFirestoreCollection<AchievementModel>;
  achievement: Observable<DocumentChangeAction<AchievementModel>[]>;

  // Administratie variabelen
  administrationCollection: AngularFirestoreCollection<any>;
  administration: Observable<DocumentChangeAction<any>[]>;

  // SweetAlert2
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  constructor(public db: AngularFirestore) {
  }

  // Admin functies
  checkLogin(naam, wachtwoord): void {
    this.usersCollection = this.db.collection('users', ref => {
      return ref.where('naam', '==', naam).where('wachtwoord', '==', wachtwoord);
    });
    this.user = this.usersCollection.valueChanges();
  }

  // Groeps functies
  getGroups(): void {
    this.groupCollection = this.db.collection('groepen', ref => {
      return ref.orderBy('punten', 'desc');
    });
    this.group = this.groupCollection.snapshotChanges();
  }

  // Achievement functies
  getAchievements(): void {
    this.achievementCollection = this.db.collection('achievements');
    this.achievement = this.achievementCollection.snapshotChanges();
  }

  // Administratieve functies
  getAdministration(): void {
    this.administrationCollection = this.db.collection('administratie');
    this.administration = this.administrationCollection.snapshotChanges();
  }

  async updateBool(collection, doc, reference, value): Promise<void> {
    await this.db.collection(collection).doc(doc).update(JSON.parse(`{ "${reference}" : ${value} }`));
    this.Toast.fire({icon: 'success', title: 'Waarde aangepast'});
  }

  update(collection, doc, reference, value): void {
    this.db.collection(collection).doc(doc).update(JSON.parse(`{ "${reference}" : "${value}" }`));
    this.Toast.fire({icon: 'success', title: 'Waarde aangepast'});
  }

  createSimpleNotification(iconT, titleT): void {
    this.Toast.fire({icon: iconT, title: titleT});
  }

}
