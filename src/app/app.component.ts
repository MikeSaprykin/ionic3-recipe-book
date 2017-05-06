import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Store} from "@ngrx/store";
import {State} from "../store/store";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string = 'Tabs';

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public store: Store<State>) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

