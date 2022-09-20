import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  lengthStorage: number;
  constructor(
    private storage: Storage,
    private router: Router,
    private navCtrl: NavController,
    private authService: AuthService,
    private menuCtrl: MenuController
  ) {}
  async canLoad() {
    const isAuthenticated = localStorage.getItem('connectUser');
    // await this.authService.getStorage("user").then(
    //   (res) => {
    //     return res;
    //   },
    //   (error) => {
    //     return error;
    //   }
    // );
    if (isAuthenticated === 'true') {
      this.menuCtrl.enable(true);
      return true;
    } else {
      const navigation = this.router.getCurrentNavigation();

      let url = '/';
      if (navigation) {
        url = navigation.extractedUrl.toString();
      }

      this.navCtrl.navigateForward([
        '/signin',
        { queryParams: { returnTo: url } },
      ]);
      return false;
    }
  }
}
