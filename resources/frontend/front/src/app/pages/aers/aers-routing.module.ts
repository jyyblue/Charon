import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EventListComponent } from "./event-list/event-list.component";
import { ExhibitorListComponent } from "./exhibitor-list/exhibitor-list.component";
const routes: Routes = [
  { path: "list", component: EventListComponent },
  { path: "exhibitor-list/:id", component: ExhibitorListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AersRoutingModule {}
