import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RetreivementPageRoutingModule } from "./retreivement-routing.module";
import { RetreivementPage } from "./retreivement.page";
import { SharedModule } from "src/app/pages/shared.module";

@NgModule({
  imports: [CommonModule, SharedModule, RetreivementPageRoutingModule],
  declarations: [RetreivementPage],
})
export class RetreivementPageModule {}
