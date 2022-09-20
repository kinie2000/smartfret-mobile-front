
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpClient,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { CommandInt } from '../CommandeIn';
import { HostService } from './host-service.service';
import { LoandingServiceService } from './loanding-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecieverIn } from '../reciever-in';

@Injectable({ providedIn: 'root' })
export class CommandeService implements HttpInterceptor {
  constructor(
    private http: HttpClient,
    private getHost: HostService,
    private loading: LoandingServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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

  getAll(idcustomer) {
    const obj = {
      customerId: idcustomer,
    };
    return this.http.post(this.getHost.gethttps() + 'showcmd', obj);
  }

  getDet(idbon) {
    const obj = {
      Csid: idbon,
    };
    return this.http.post(this.getHost.gethttps() + 'showdetailcmd', obj);
  }

  get(idbc) {
    const obj = {
      Csid: idbc,
    };
    return this.http.post(this.getHost.gethttps() + 'show', obj);
  }

  getpacket(valeur) {
    const obj = {
      code: valeur,
    };
    return this.http.post(this.getHost.gethttps() + 'showpacket', obj);
  }

  commandeServiceClient(obj: any) {
    return this.http.post(this.getHost.gethttps() + 'demandService', obj);
  }
  createcmd(valeur, tabvaleur) {
    const obj = {
      cmd: valeur,
      tab: tabvaleur,
    };
    return this.http.post(this.getHost.gethttps() + 'addcmd2', obj);
  }

  getcustomer() {
    return this.http.get(this.getHost.gethttps() + 'getcustomer');
  }

  getreciever(code: any) {
    const obj = {
      cstid: code,
    };
    return this.http.post(this.getHost.gethttps() + 'getreciever', obj);
  }
  getstandard() {
    return this.http.get(this.getHost.gethttps() + 'getstandard');
  }
  createReceiver(code) {
    const obj = {
      cstid: code,
    };
    return this.http.post(this.getHost.gethttps() + 'createReceiver', obj);
  }
  creatCustomer(code) {
    const obj = {
      cstid: code,
    };
    return this.http.post(this.getHost.gethttps() + 'creatCustomer', obj);
  }
  custcat(cstid) {
    const obj = {
      cstid,
    };
    return this.http.post(this.getHost.gethttps() + 'custcat', obj);
  }
  adminDCB(id) {
    return this.http.post(this.getHost.gethttps() + 'showadmcmd', id);
  }
}
