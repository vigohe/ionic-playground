import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFire, FirebaseObjectObservable} from "angularfire2";

/*
  Generated class for the Playground page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-playground',
  templateUrl: 'playground.html'
})
export class PlaygroundPage {
  item: FirebaseObjectObservable<any>;
  constructor(public navCtrl: NavController, public af : AngularFire) {}

  ionViewDidLoad() {
    console.log('Hello PlaygroundPage Page');
    this.item = this.af.database.object('/item');
  }

}
