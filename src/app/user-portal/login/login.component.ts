import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {MainService} from '../../shared/main.service';
import {UserModel} from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  succes = true;

  users: UserModel[] = [];

  constructor(private main: MainService) { }

  ngOnInit(): void {
  }

  async onFormSubmit(postData: { studentnummer: string; groep: string }): Promise<void> {
    await this.main.checkLogin(postData.studentnummer, postData.groep);
    await this.main.user.forEach(value => {
      if (value.length !== 0) {
        Swal.fire(
          'Succesvol ingelogd',
          'Je wordt nu doorverwezen...',
          'success'
        );
      } else {
        Swal.fire(
          'Foute inlog',
          'De combinatie van gegevens is incorrect',
          'error'
        );
      }
    });
  }
}
