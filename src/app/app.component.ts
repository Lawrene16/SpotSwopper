import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Router } from '@angular/router';
// import { Storage } from '@ionic/angular'
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  refernumber;
  fullname;
  balance;
  useremail;
  

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'My Account',
      url: '/myaccount',
      icon: 'person'
    },
    {
      title: 'Referrals',
      url: '/referrals',
      icon: 'people'
    },
    {
      title: 'Transaction History',
      url: '/history',
      icon: 'list'
    },
    {
      title: 'Help',
      url: '/help',
      icon: 'help-circle-outline'
    },
    {
      title: 'Share',
      url: '/home',
      icon: 'share'
    },
    {
      title: 'Logout',
      url: '/login',
      icon: 'log-out'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private events: Events,
    private statusBar: StatusBar,
    private socialSharing: SocialSharing,
    private router: Router,
    private storage: Storage
  ) {
    this.initializeApp();

    this.events.subscribe('userstuff', (res) =>{
      // console.log(res)
          this.fullname = res.name;
        this.refernumber = res.refernumber;
        this.useremail = res.email;
        this.balance = res.balance.toFixed(2);
    })
  }

  checkPage(p){
    if(p.title == "Logout"){
      firebase.auth().signOut().then(() =>{
        this.router.navigateByUrl(p.url)
      });
    }

    else if(p.title == "Share"){
      this.regularShare();
    }

    else{
      this.router.navigateByUrl(p.url)
    }
  }


  compilemsg(): string {
    var msg = "Hi, this is an awesome app built for buying and selling of spots";
    return msg.concat(" \n Sent from my Awesome App !" + " \n " + this.refernumber);
  }

  regularShare() {
    var msg = this.compilemsg();
    this.socialSharing.share(msg, null, null, null);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#222428');
      this.statusBar.overlaysWebView(false); 
      this.splashScreen.hide();
    });
  }
}
