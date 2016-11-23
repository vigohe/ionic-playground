import { Component } from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {AngularFire, FirebaseObjectObservable, AuthProviders, AuthMethods} from "angularfire2";
import {Observable} from "rxjs";

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

  constructor(public navCtrl: NavController, public af : AngularFire, public alertCtrl: AlertController) {}

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

  login() {
    console.log(this.usuario);

    this.af.auth.login({
      email: this.usuario.username,
      password: this.usuario.password
    }).then(data => console.log(data)).catch(e => this.showAlert(e));

  }

  logout() {
    this.af.auth.logout();
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
