import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommandsPage } from './commands.page';
import { DetailCommandePage } from './detail-commande/detail-commande.page';
import { AddcmdPage } from './addcmd/addcmd.page';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { NewcmdPage } from './newcmd/newcmd.page';
import { CustomerPage } from './customer/customer.page';
import { RecieverPage } from './reciever/reciever.page';
import { EditcolisPage } from './editcolis/editcolis.page';
import { PrefetchService } from 'src/app/services/prefetch.service';


const routes: Routes = [
  {
    path: '',
    component: CommandsPage,
  },
  {
    path: 'detail/:id',
    component: DetailCommandePage,
  },
  {
    path: 'addcmd',
    component: AddcmdPage,
  },
  {
    path: 'newcmd',
    component: NewcmdPage,
   // resolve: { client: PrefetchService},
  },
  {
    path: 'customer',
    component: CustomerPage,
  },
  {
    path: 'reciever',
    component: RecieverPage,
  },
  {
    path: 'editcolis',
    component: EditcolisPage,
  },
];

@NgModule({
  imports: [
    NgxPaginationModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  exports: [NgxPaginationModule, RouterModule],
  providers: [PrefetchService],
})
export class CommandsPageRoutingModule {}
