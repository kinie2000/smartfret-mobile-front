import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HostService {
  constructor(private Http: HttpClient) {}

  gethttps() {
    // return 'http://localhost:8000/api/';
   // return 'http://localhost:8000/api/';
 //  return 'https://apitest.smartfret.com/api/';
    return 'https://apimobil.app.smartfret.com/api/';

  }
}
