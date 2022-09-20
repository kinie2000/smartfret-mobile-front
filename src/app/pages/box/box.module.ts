import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BoxPageRoutingModule } from "./box-routing.module";
import { BoxPage } from "./box.page";
import { SharedModule } from "src/app/pages/shared.module";

@NgModule({
  imports: [CommonModule, SharedModule, BoxPageRoutingModule],
  declarations: [BoxPage],
})
export class BoxPageModule {}
