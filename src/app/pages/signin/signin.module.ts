import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SigninPageRoutingModule } from "./signin-routing.module";
import { SigninPage } from "./signin.page";
import { SharedModule } from "src/app/pages/shared.module";

@NgModule({
  imports: [CommonModule, SharedModule, SigninPageRoutingModule],
  declarations: [SigninPage],
})
export class SigninPageModule {}
