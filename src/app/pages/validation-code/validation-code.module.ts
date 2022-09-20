import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ValidationCodePageRoutingModule } from "./validation-code-routing.module";
import { ValidationCodePage } from "./validation-code.page";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/pages/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ValidationCodePageRoutingModule,
    RouterModule.forChild([
      {
        path: "",
        component: ValidationCodePage,
      },
    ]),
  ],
  declarations: [ValidationCodePage],
  exports: [ValidationCodePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ValidationCodePageModule {}
