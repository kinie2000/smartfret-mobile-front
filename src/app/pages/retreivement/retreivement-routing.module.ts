import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetreivementPage } from './retreivement.page';

const routes: Routes = [
  {
    path: '',
    component: RetreivementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetreivementPageRoutingModule {}
