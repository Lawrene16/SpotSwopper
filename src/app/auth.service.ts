import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private googleplus: GooglePlus, private fb: Facebook)
  {}

  facebookNativeLogin() {
    return new Promise((resolve, reject) => {
      var perms = new Array("email", "public_profile");
      this.fb
        .login(perms)
        .then((response: FacebookLoginResponse) => {
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
            response.authResponse.accessToken
          );
          firebase
            .auth()
            .signInWithCredential(facebookCredential)
            .then((result) => {
              var user = result.user;
              resolve(user);
            })
            .catch((err) => {
              reject(err);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  googleNativeLogin() {
    return new Promise((resolve, reject) => {
      this.googleplus
        .login({
          webClientId:
            "72131126436-cn1e98df7gpmc6u6m0r1p0id67q1mi8d.apps.googleusercontent.com",
          scopes: "",
          offline: true,
        })
        .then(
          (response) => {
            const googleCredential = firebase.auth.GoogleAuthProvider.credential(
              response.idToken
            );
            firebase
              .auth()
              .signInWithCredential(googleCredential)
              .then((result) => {
                var user = result.user;
                resolve(user);
              });
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
}
