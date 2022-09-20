import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidationCodePage } from './validation-code.page';

const routes: Routes = [
  {
    path: '',
    component: ValidationCodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidationCodePageRoutingModule {}
