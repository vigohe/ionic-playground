import {Component} from "@angular/core";
import {NavController, AlertController, Platform} from "ionic-angular";
import {AngularFire, AuthProviders, AuthMethods, FirebaseAuthState} from "angularfire2";
import {AuthService} from "../../providers/auth-service";
import {UserInfoPage} from "../user-info/user-info";
import {GooglePlus} from "ionic-native";

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
  auth: string = "DESLOGEADO...";

  constructor(public navCtrl: NavController, public af : AngularFire, public alertCtrl: AlertController,private _auth: AuthService,private platform: Platform) {}

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
    }).then(firebaseAuthState => this.onSignInSuccess())
      .catch(e => this.showAlert(e));
  }

  loginGoogle(){
    this._auth.signInWithGoogle()
      .then(firebaseAuthState => this.onSignInSuccess());
  }

  loginFacebook(){
    this._auth.signInWithFacebook()
      .then(firebaseAuthState => this.onSignInSuccess(), error => this.alertCtrl.create({
        title: error.name,
        subTitle: error.message,
        message: error.stack,
        buttons: ['OK']
      }).present());

  }

  googlePlusLogin()
  {

    this.af.auth.subscribe((data: FirebaseAuthState) => {

      this.af.auth.unsubscribe();
      console.log("in auth subscribe", data);

      this.platform.ready().then(() => {
        GooglePlus.login({
          'webClientId' : '378624197918-ff3qifv24gpgkqdi82t8p71kr2ic756r.apps.googleusercontent.com' }) .then((userData) => {

          let provider = firebase.auth.GoogleAuthProvider.credential(userData.idToken);

          firebase.auth().signInWithCredential(provider)
            .then((success) => {
              console.log("Firebase success: " + JSON.stringify(success));
              // this.displayAlert(success,"signInWithCredential successful")
              // this.userProfile = success;
              this.auth = "SUCCESS...";
            })
            .catch((error) => {
              console.log("Firebase failure: " + JSON.stringify(error));
              // this.displayAlert(error,"signInWithCredential failed")
              this.auth = JSON.stringify(error);
            });

        })
          .catch((error) => {
            console.log("Firebase failure: " + JSON.stringify(error));
            // this.displayAlert(error,"signInWithCredential failed")
            this.auth = JSON.stringify(error);
          });

      })
    })

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
