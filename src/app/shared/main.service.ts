import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {UserModel} from '../models/user.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {GroupModel} from "../models/group.model";

@Injectable()
export class MainService{

  // Admin variabelen
  usersCollection: AngularFirestoreCollection<UserModel>;
  user: Observable<UserModel[]>;

  // Groeps variabelen
  groupCollection: AngularFirestoreCollection<GroupModel>;
  group: Observable<GroupModel[]>;

  constructor(private db: AngularFirestore) {
  }

  // Admin functies
  checkLogin(studentnummer, groep): void {
    this.usersCollection = this.db.collection('users', ref => {
      return ref.where('studentnummer', '==', studentnummer).where('groep', '==', groep);
    });
    this.user = this.usersCollection.valueChanges();
  }

  // Groeps functies
  getGroups(): void{
    this.groupCollection = this.db.collection('groepen');
    this.group = this.groupCollection.valueChanges();
  }
}
