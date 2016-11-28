import {Component} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
import {AngularFire, AuthProviders, AuthMethods} from "angularfire2";
import {AuthService} from "../../providers/auth-service";
import {UserInfoPage} from "../user-info/user-info";

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

  usuario: {username?: string, password?: string} = {};

  constructor(public navCtrl: NavController, public af : AngularFire, public alertCtrl: AlertController,private _auth: AuthService) {}

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

  login() {
    this.af.auth.login({
      email: this.usuario.username,
      password: this.usuario.password
    },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
    }).then(firebaseAuthState => this.onSignInSuccess()).catch(e => this.showAlert(e));
  }

  loginGoogle(){
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }).then(firebaseAuthState => this.onSignInSuccess());
  }

  loginFacebook(){
    this._auth.signInWithFacebook()
      .then(firebaseAuthState => this.onSignInSuccess());
  }

  private onSignInSuccess(): void {
    this.navCtrl.push(UserInfoPage);
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
