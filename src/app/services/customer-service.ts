import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { HostService } from './host-service.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService implements HttpInterceptor {
  strorageUser: any;
  constructor(
    private Http: HttpClient,
    private storage: Storage,
    private getHost: HostService
  ) {}

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

  async updateCustomer(obj: any) {
    const promise = new Promise((resolve, reject) => {
      return this.Http.post(this.getHost.gethttps() + 'updateCustomer', obj, {
        withCredentials: true,
      }).subscribe(
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
}
