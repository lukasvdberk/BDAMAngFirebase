import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from '@angular/fire/firestore';
import {UserModel} from '../models/user.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {GroupModel} from '../models/group.model';
import {AchievementModel} from '../models/achievement.model';

@Injectable()
export class MainService{

  // Gebruikers variabelen
  usersCollection: AngularFirestoreCollection<UserModel>;
  user: Observable<UserModel[]>;

  // Groeps variabelen
  groupCollection: AngularFirestoreCollection<GroupModel>;
  group: Observable<GroupModel[]>;

  // Achievements variabelen
  achievementCollection: AngularFirestoreCollection<AchievementModel>;
  achievement: Observable<DocumentChangeAction<AchievementModel>[]>;

  // Administratie variabelen
  administrationCollection: AngularFirestoreCollection<any>;
  administration: Observable<any[]>;


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
    this.groupCollection = this.db.collection('groepen');
    this.group = this.groupCollection.valueChanges();
  }

  // Achievement functies
  getAchievements(): void {
    this.achievementCollection = this.db.collection('achievements');
    this.achievement = this.achievementCollection.snapshotChanges();
  }

  // Administratieve functies
  getAdministration(): void {
    this.administrationCollection = this.db.collection('administratie');
    this.administration = this.administrationCollection.valueChanges();
  }

  updateBalie(currValue: boolean): void {
    this.db.collection('administratie').doc('status').update({open: !currValue});
  }

}
