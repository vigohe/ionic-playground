import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import {LoginPage} from "../pages/login/login";
import {AngularFireModule, AuthMethods, AuthProviders} from 'angularfire2';
import {TabsPage} from "../pages/tabs/tabs";
import {PlaygroundPage} from "../pages/playground/playground";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../providers/auth-service";

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyBl8IL1Mh9_gFGt6JaoMNxlJJTHMXO_o74",
  authDomain: "ionic-playground-46432.firebaseapp.com",
  databaseURL: "https://ionic-playground-46432.firebaseio.com",
  storageBucket: "ionic-playground-46432.appspot.com",
};

export const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
    PlaygroundPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig,myFirebaseAuthConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    PlaygroundPage
  ],
  providers: [AuthService]
})
export class AppModule {}
