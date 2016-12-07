import {Injectable} from "@angular/core";
import {FirebaseAuthState, FirebaseAuth, AuthMethods, AuthProviders, AngularFire} from "angularfire2";
import {Facebook} from "ionic-native";
import {Platform} from "ionic-angular";
import {Observable} from "rxjs";

/*
 Generated class for the AuthService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class AuthService {

  private authState: FirebaseAuthState;
  // private storage: firebase.storage.Storage;

  constructor(public auth$: FirebaseAuth, public af: AngularFire, private platform: Platform) {
    // this.authState = auth$.getAuth();
    // this.storage = firebaseApp.storage();

    // auth$.subscribe((state: FirebaseAuthState) => {
    //   this.authState = state;
    //
    //   // if(state){
    //   //   this.saveUser(state);
    //   // }
    //
    // });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  signInWithFacebook() : firebase.Promise<FirebaseAuthState>{
    if (this.platform.is('cordova')) {
      return Facebook.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      });
    } else {
      return this.auth$.login({
        provider: AuthProviders.Facebook,
        method: AuthMethods.Popup
      });

    }
  }


  signInWithGoogle(): firebase.Promise<FirebaseAuthState> {
    return this.auth$.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  signOut(): void {
    this.auth$.logout();
  }

  // saveUser(state : FirebaseAuthState){
  //   let userRef : FirebaseObjectObservable<User>;
  //   let image: string;
  //
  //   userRef = this.af.database.object('/users/' + state.uid );
  //   let user : User = this.getUser(state);
  //   userRef.set(user);
  //   const storageRef = this.storage.ref().child('users/' + state.uid );
  //   this._http.get(user.photo,{responseType: ResponseContentType.Blob})
  //     .subscribe((response) => {
  //         storageRef.put(response.blob())
  //           .then(
  //             () => console.log('upload complete....'),
  //             error=> console.log(error)
  //           )
  //     });
  // }
  //
  // getUser(state : FirebaseAuthState ){
  //   switch(state.provider){
  //     case AuthProviders.Google:
  //       return new User(
  //         state.google.displayName,
  //         state.google.email,
  //         state.google.photoURL,
  //         state.provider);
  //
  //     case AuthProviders.Facebook:
  //       return new User(
  //         state.facebook.displayName,
  //         state.facebook.email,
  //         state.facebook.photoURL,
  //         state.provider);
  //   }
  // }

}
