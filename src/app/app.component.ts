import {Component} from "@angular/core";
import {Platform} from "ionic-angular";
import {StatusBar, Splashscreen} from "ionic-native";
import {LoginPage} from "../pages/login/login";


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform) {

    this.rootPage = LoginPage;

    // authService.auth$.subscribe(auth => {
    //   if( auth ){
    //     this.rootPage = UserInfoPage
    //   }else{
    //     this.rootPage = LoginPage
    //   }}, () => this.rootPage = LoginPage);

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

  }
}
