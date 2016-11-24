import { Component } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {AngularFire, FirebaseObjectObservable, AuthProviders, AuthMethods} from "angularfire2";
import {Observable} from "rxjs";
import {AuthService} from "../../providers/auth-service";

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginObservable : Observable<any>;

  usuario: {username?: string, password?: string} = {};

  constructor(public navCtrl: NavController, public af : AngularFire, public alertCtrl: AlertController,private _auth: AuthService) {}

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
    this.af.auth.subscribe(auth => console.log(auth));
  }

  login() {
    console.log(this.usuario);

    this.af.auth.login({
      email: this.usuario.username,
      password: this.usuario.password
    },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
    }).then(data => console.log(data)).catch(e => this.showAlert(e));

  }

  logout() {
    this.af.auth.logout();
  }

  loginGoogle(){
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  loginFacebook(){
    this._auth.signInWithFacebook()
      .then(() => this.onSignInSuccess());
  }

  private onSignInSuccess(): void {
    console.log("Facebook display name ",this._auth.displayName());
  }

  showAlert(error) {
    let alert = this.alertCtrl.create({
      title: error.code,
      subTitle: error.message,
      buttons: ['OK']
    });
    alert.present();
  }

}
