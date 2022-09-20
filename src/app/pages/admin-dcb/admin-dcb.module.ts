import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminDCBPageRoutingModule } from './admin-dcb-routing.module';

import { AdminDCBPage } from './admin-dcb.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminDCBPageRoutingModule,
    Ng2SearchPipeModule,
  ],
  declarations: [AdminDCBPage],
})
export class AdminDCBPageModule {}
