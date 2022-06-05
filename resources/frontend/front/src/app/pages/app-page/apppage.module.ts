import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppPageComponent } from "./app-page.component";
import { AppPageRoutingModule } from "./apppage-routing.module";

@NgModule({
  declarations: [AppPageComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppPageRoutingModule,
    NgbModule
  ]
})
export class AppPageModule {}
