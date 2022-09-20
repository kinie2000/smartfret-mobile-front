import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminDCBPage } from './admin-dcb.page';

const routes: Routes = [
  {
    path: '',
    component: AdminDCBPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), NgxPaginationModule],
  exports: [RouterModule, NgxPaginationModule],
})
export class AdminDCBPageRoutingModule {}
