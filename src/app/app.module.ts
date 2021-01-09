import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {FormsModule} from '@angular/forms';
import { UserPortalComponent } from './user-portal/user-portal.component';
import { LoginComponent } from './user-portal/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {MainService} from './shared/main.service';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import { CountdownComponent } from './countdown/countdown.component';
import { DashboardComponent } from './user-portal/dashboard/dashboard.component';

const appRoutes: Routes = [
  {path: 'admin', component: UserPortalComponent},
  {path: '', component: ScoreboardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UserPortalComponent,
    LoginComponent,
    ScoreboardComponent,
    CountdownComponent,
    CountdownComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FontAwesomeModule
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
