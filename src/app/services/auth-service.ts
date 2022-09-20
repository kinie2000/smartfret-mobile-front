import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, filter } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { HostService } from './host-service.service';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements HttpInterceptor {
  strorageUser: any;
  previous: any;
  currents: any;
  routeConnect = [
    '/commands',
    '/retreivement',
    '/box',
    '/reclamation',
    'AdminDCBPage',
  ];

  constructor(
    private Http: HttpClient,
    private storage: Storage,
    private getHost: HostService,
    private navControl: NavController,
    private location: Location,
    private router: Router
  ) {
    this.getStorage('user');
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(req);
    return next.handle(req).pipe(
      catchError((error) => {
        console.log('error is intercept');
        console.error(error);
        return throwError(error.message);
      })
    );
  }

  getlocal() {
    this.routeConnect.includes(this.location.path()) &&
    localStorage.getItem('connectUser') === 'false'
      ? this.navControl.navigateRoot('/SmartFret')
      : // tslint:disable-next-line:no-unused-expression
        '';
  }

  // tslint:disable-next-line:ban-types
  login(obj: Object) {
    return this.Http.post(this.getHost.gethttps() + 'login', obj, {
      withCredentials: true,
    });
  }

  async forgetPassword(obj: any) {
    const promise = new Promise((resolve, reject) => {
      this.Http.post(this.getHost.gethttps() + 'forgetPassword', obj, {
        withCredentials: true,
      }).subscribe(
        (res: any) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });

    const result = await promise;
    return result;
  }

  async verifyCode(code: number) {
    const promise = new Promise((resolve, reject) => {
      this.Http.post(
        this.getHost.gethttps() + 'verifyCode',
        // tslint:disable-next-line:object-literal-shorthand
        { code: code },
        { withCredentials: true }
      ).subscribe(
        (res: any) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });

    const result = await promise;
    return result;
  }

  async changePassword(obj) {
    const promise = new Promise((resolve, reject) => {
      this.Http.post(this.getHost.gethttps() + 'changePassword', obj, {
        withCredentials: true,
      }).subscribe(
        (res: any) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });

    const result = await promise;
    return result;
  }

  getUser() {
    return this.Http.get(this.getHost.gethttps() + 'customer', {
      withCredentials: true,
    });
  }

  /**
   * @method getStorage this method return the data in app storage
   * @param item is element saved in storage
   * @returns data object
   */
  async getStorage(item: string) {
    const promise = new Promise((resolve, reject) => {
      this.storage.get(item).then(
        (val) => {
          resolve(val);
        },
        (error) => {
          reject(error);
        }
      );
    });

    const result = await promise;
    return result;
  }

  /**
   * @method setStorage this method save the data in app storage
   * @param data it's information of user connected
   * @param item is element saved in storage
   */
  async setStorage(item: string, data: any) {
    const promise = new Promise((resolve, reject) => {
      this.storage.set(item, data).then(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });

    const result = await promise;
    return result;
  }

  setStorage2(item: string, data: any) {
    localStorage.setItem(item, data);
  }

  /**
   * @method deleteStorage this method remove the item in app storage
   * @param data it's information of user connected
   * @param item is element saved in storage
   */
  deleteStorage(key: string) {
    localStorage.removeItem(key);
  }

  loggout() {
    this.deleteStorage('user');
    this.setStorage2('connectUser', 'false');
    // this.navControl.pop();
    this.navControl.navigateRoot(['/signin']);
  }
}
