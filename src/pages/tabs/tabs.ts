import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {PlaygroundPage} from "../playground/playground";

/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  constructor(public navCtrl: NavController) {}

  login: any = LoginPage;
  playGround: any = PlaygroundPage;

  ionViewDidLoad() {
    console.log('Hello TabsPage Page');
  }

}
