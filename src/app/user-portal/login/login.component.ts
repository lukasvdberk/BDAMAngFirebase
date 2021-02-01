import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import {MainService} from '../../shared/services/main.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() login = new EventEmitter();

  succes = true;

  constructor(private main: MainService, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
  }

  async onFormSubmit(postData: { naam: string; wachtwoord: string }): Promise<void> {
    this.afAuth.signInWithEmailAndPassword(postData.naam, postData.wachtwoord).then(e => {
      this.login.emit();
      this.main.Toast.fire({
        icon: 'success',
        title: 'Login succesvol'
      });
    }, err => {
      this.main.Toast.fire({
        icon: 'error',
        title: 'Foutieve inloggegevens'
      });
    });
  }
}
