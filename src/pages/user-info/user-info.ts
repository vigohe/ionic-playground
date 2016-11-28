import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {AngularFire} from "angularfire2";

/*
  Generated class for the UserInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html'
})
export class UserInfoPage {

  constructor(public navCtrl: NavController,public af : AngularFire) {}

  ionViewDidLoad() {
    console.log('Hello UserInfoPage Page');
  }

  logout() {
    this.af.auth.logout();
  }

}
