import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {UserModel} from '../models/user.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {GroupModel} from '../models/group.model';
import {AchievementModel} from '../models/achievement.model';

@Injectable()
export class MainService{

  // Admin variabelen
  usersCollection: AngularFirestoreCollection<UserModel>;
  user: Observable<UserModel[]>;

  // Groeps variabelen
  groupCollection: AngularFirestoreCollection<GroupModel>;
  group: Observable<GroupModel[]>;

  // Achievements variabelen
  achievementCollection: AngularFirestoreCollection<AchievementModel>;
  achievement: Observable<AchievementModel[]>;

  // Administratie variabelen
  administrationCollection: AngularFirestoreCollection<any>;
  administration: Observable<any[]>;


  constructor(public db: AngularFirestore) {
  }

  // Admin functies
  checkLogin(studentnummer, groep): void {
    this.usersCollection = this.db.collection('users', ref => {
      return ref.where('studentnummer', '==', studentnummer).where('groep', '==', groep);
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
    this.achievement = this.achievementCollection.valueChanges();
  }

  // Administratieve functies
  getAdministration(): void {
    this.administrationCollection = this.db.collection('administratie');
    this.administration = this.administrationCollection.valueChanges();
  }

}
