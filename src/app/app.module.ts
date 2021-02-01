import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {FormsModule} from '@angular/forms';
import { UserPortalComponent } from './user-portal/user-portal.component';
import { LoginComponent } from './user-portal/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {MainService} from './shared/services/main.service';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import { CountdownComponent } from './scoreboard/countdown/countdown.component';
import { DashboardComponent } from './user-portal/dashboard/dashboard.component';
import { BattleComponent } from './battle/battle.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  {path: 'admin', component: UserPortalComponent},
  {path: 'battle', component: BattleComponent},
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
    BattleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
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
