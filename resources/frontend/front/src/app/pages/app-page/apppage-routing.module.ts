import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppPageComponent } from "./app-page.component";

const routes: Routes = [{ path: "", component: AppPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppPageRoutingModule {}
