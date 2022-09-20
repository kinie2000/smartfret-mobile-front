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
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service';

@Injectable({
  providedIn: 'root',
})
export class Guard2Guard implements CanLoad {
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private authService: AuthService
  ) {}

  async canLoad() {
    const connectuser = localStorage.getItem('connectUser');

    if (connectuser === 'false') {
      this.navCtrl.navigateRoot('/commands');
      return true;
    } else {
      console.log('yeesssssoooo');
      return true;
    }
  }
}
