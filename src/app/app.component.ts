import { Component, OnInit } from '@angular/core';
import {FaConfig} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BDAMAngFirebase';

  constructor(faConfig: FaConfig) {
    faConfig.fixedWidth = true;
  }

  ngOnInit(): void {
  }

}
