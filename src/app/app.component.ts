import { AuthService } from './services/auth-service';
import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';

import { ActionSheetController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';


import {
  AlertController,
  IonRouterOutlet,
  MenuController,
  Platform,
} from '@ionic/angular';
import { MenuService } from './services/menu-service';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';

import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [MenuService],
})
export class AppComponent implements DoCheck, OnInit {
  @ViewChild(IonRouterOutlet, { static: true }) routerOutlet: IonRouterOutlet;
  appPages: any = [];
  headerMenuItem = {
    image: '',
    title: '',
    description: '',
    telephone: '',
    email: '',
  };

  // routeConnect = [
  //   "/commands",
  //   "/colis",
  //   "/retreivement",
  //   "/box",
  //   "/reclamation",
  // ];

  user: any = {};

  isEnabledRTL = false;
  constructor(
    private menuService: MenuService,
    private navController: NavController,
    public menuCtrl: MenuController,
    private authService: AuthService,
    private platform: Platform,
    private alertController: AlertController,

    private location: Location,
    public actionSheetController: ActionSheetController,
    private router: Router,
    private splashScreen: SplashScreen
  ) {
    this.isEnabledRTL = localStorage.getItem('isEnabledRTL') === 'true';
    this.appPages = this.menuService.getAllTheme();
    this.headerMenuItem = this.menuService.getDataForTheme();
    this.inittializeApp();
    this.backButtonEvent();
    this.user = localStorage.getItem('user');
    if(this.user)
    {

   this.user = JSON.parse(localStorage.getItem('user')).data;
   if (this.user.profil === 'admin') {
     this.openPage('admin-dcb');
   } else {
     this.openPage('commands');
   }
    }
    else
    {
      this.navController.navigateRoot('/SmartFret');
    }
  }

  inittializeApp() {
    this.platform.ready().then(() => {});
  }

  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(10, () => {
      if (!this.routerOutlet.canGoBack()) {
        this.location.path() == '/signin'
          ? this.navController.navigateRoot('/SmartFret')
          : this.backButtonAlert();
      } else {
        this.navController.pop().then(() => {
          this.authService.getlocal();
        });
      }
    });
  }

  async backButtonAlert() {
    const alert = await this.alertController.create({
      message: 'Voulez vous quitter l\'application ?  ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Close App',
          handler: () => {
            navigator['app'].exitApp();
          },
        },
      ],
    });

    await alert.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            console.log('Delete clicked');
          },
        },
        {
          text: 'Share',
          icon: 'share',
          handler: () => {
            console.log('Share clicked');
          },
        },

        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  ionViewWillEnter() {}

  openPage(page) {
    this.menuCtrl.close();
    if (page.url) {
      if (localStorage.getItem('user') && page.url === 'commands') {
        this.navController.navigateRoot([page.url], {});
      } else {
        this.navController.navigateForward([page.url], {});
      }
    } else {
      if (localStorage.getItem('user') && page === 'commands') {
        this.navController.navigateRoot([page], {});
      } else {
        this.navController.navigateForward([page], {});
      }
    }
  }

  ngDoCheck() {
    // this.user = localStorage.getItem('user');
    this.verify();
  }

  closeSide(openned) {
    openned.close();
  }

  loggout() {
    this.menuCtrl.enable(false);
    this.authService.loggout();
  }

  verify() {
    this.appPages = this.menuService.getAllTheme();
    return true;
  }
}
