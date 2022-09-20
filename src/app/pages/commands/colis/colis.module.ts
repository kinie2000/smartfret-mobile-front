import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ColisPageRoutingModule } from "./colis-routing.module";
import { ColisPage } from "./colis.page";
import { SharedModule } from "src/app/pages/shared.module";

@NgModule({
  imports: [CommonModule, SharedModule, ColisPageRoutingModule],
  declarations: [ColisPage],
})
export class ColisPageModule {}
