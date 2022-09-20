import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandsPageRoutingModule } from './commands-routing.module';
import { CommandsPage } from './commands.page';
import { DetailCommandePage } from './detail-commande/detail-commande.page';
import { SharedModule } from 'src/app/pages/shared.module';
import { AddcmdPage } from './addcmd/addcmd.page';
import { NewcmdPage } from './newcmd/newcmd.page';
import { SignaturePadModule } from 'angular2-signaturepad';
import { CustomerPage } from './customer/customer.page';
import { RecieverPage } from './reciever/reciever.page';
import { EditcolisPage } from './editcolis/editcolis.page';


// import { IonicSignaturePadModule, IonicsignaturepadComponent } from 'ionicsignaturepad';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CommandsPageRoutingModule,
    SignaturePadModule,
  ],
  // entryComponents: [CustomerPage],
  declarations: [
    CommandsPage,
    DetailCommandePage,
    AddcmdPage,
    NewcmdPage,
    CustomerPage,
    RecieverPage,
    EditcolisPage,
  ],
  entryComponents: [CustomerPage],
})
export class CommandsPageModule {}
// #263238
