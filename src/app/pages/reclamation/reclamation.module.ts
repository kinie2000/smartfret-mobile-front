import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReclamationPageRoutingModule } from "./reclamation-routing.module";
import { ReclamationPage } from "./reclamation.page";
import { SharedModule } from "src/app/pages/shared.module";

@NgModule({
  imports: [CommonModule, SharedModule, ReclamationPageRoutingModule],
  declarations: [ReclamationPage],
})
export class ReclamationPageModule {}
