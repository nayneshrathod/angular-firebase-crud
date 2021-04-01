import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Users } from 'src/app/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: AngularFirestore) { }

  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }
  createUser(user: Users) {
    return this.firestore.collection('users').add(user);
  }
  updateUser(user: Users) {
    delete user.id;
    this.firestore.doc('users/' + user.id).update(user);
  }
  deleteUser(userid: string) {
    this.firestore.doc('users/' + userid).delete();
  }
}
