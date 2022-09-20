import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SplashScreenPageRoutingModule } from "./splash-screen-routing.module";

import { SplashScreenPage } from "./splash-screen.page";
import { SharedModule } from "src/app/pages/shared.module";

@NgModule({
  imports: [CommonModule, SharedModule, SplashScreenPageRoutingModule],
  declarations: [SplashScreenPage],
  exports: [SplashScreenPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SplashScreenPageModule {}
