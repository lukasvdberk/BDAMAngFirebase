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

const appRoutes: Routes = [
  {path: '', component: UserPortalComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UserPortalComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
