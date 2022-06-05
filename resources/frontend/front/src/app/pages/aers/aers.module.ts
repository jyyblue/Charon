import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AersRoutingModule } from "./aers-routing.module";
import { EventListComponent } from "./event-list/event-list.component";
import { EventDetailComponent } from "./event-detail/event-detail.component";
import { ExhibitorListComponent } from './exhibitor-list/exhibitor-list.component';

@NgModule({
  declarations: [EventListComponent, EventDetailComponent, ExhibitorListComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AersRoutingModule,
    NgbModule
  ]
})
export class AersModule {}
