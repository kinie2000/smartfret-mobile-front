import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/pages/shared.module";

import { ForgetPasswordPage } from "./forgetpassword.page";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: "",
        component: ForgetPasswordPage,
      },
    ]),
  ],
  declarations: [ForgetPasswordPage],
  exports: [ForgetPasswordPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ForgetPasswordModule {}
