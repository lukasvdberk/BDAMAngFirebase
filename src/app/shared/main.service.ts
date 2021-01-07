import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {UserModel} from '../models/user.model';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class MainService{
  usersCollection: AngularFirestoreCollection<UserModel>;
  user: Observable<UserModel[]>;

  constructor(private db: AngularFirestore) {
    // this.usersCollection = this.db.collection('users');
    // this.user = this.usersCollection.valueChanges();
  }

  checkLogin(studentnummer, groep) {
    this.usersCollection = this.db.collection('users', ref => {
      return ref.where('studentnummer', '==', studentnummer).where('groep', '==', groep);
    });
    this.user = this.usersCollection.valueChanges();
  }
}
