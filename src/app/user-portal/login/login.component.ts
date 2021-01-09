import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import {MainService} from '../../shared/main.service';
import {UserModel} from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() login = new EventEmitter();

  succes = true;

  users: UserModel[] = [];

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  constructor(private main: MainService) {}

  ngOnInit(): void {
  }

  async onFormSubmit(postData: { naam: string; wachtwoord: string }): Promise<void> {
    await this.main.checkLogin(postData.naam, postData.wachtwoord);
    await this.main.user.forEach(value => {
      if (value.length !== 0) {
        this.login.emit();
        this.Toast.fire({
          icon: 'success',
          title: 'Login succesvol'
        });
      } else {
        this.Toast.fire({
          icon: 'error',
          title: 'Foutieve inloggegevens'
        });
      }
    });
  }
}
