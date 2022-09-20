import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { CustomerIn } from '../customer-in';
import { CommandeService } from './commande-service';

@Injectable()
export class PrefetchService implements Resolve<CustomerIn> {
  constructor(public product: CommandeService) {}

  resolve(): Observable<any> {
    return this.product.getcustomer();
  }
}
