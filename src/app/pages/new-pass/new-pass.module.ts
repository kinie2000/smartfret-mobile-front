import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NewPassPage } from "./new-pass.page";
import { NewPassPageRoutingModule } from "./new-pass-routing.module";
import { SharedModule } from "src/app/pages/shared.module";

@NgModule({
  imports: [CommonModule, SharedModule, NewPassPageRoutingModule],
  declarations: [NewPassPage],
})
export class NewPassPageModule {}
