import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfilsPageRoutingModule } from "./profils-routing.module";
import { ProfilsPage } from "./profils.page";
import { SharedModule } from "src/app/pages/shared.module";

@NgModule({
  imports: [CommonModule, SharedModule, ProfilsPageRoutingModule],
  declarations: [ProfilsPage],
})
export class ProfilsPageModule {}
