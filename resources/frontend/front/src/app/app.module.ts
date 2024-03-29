import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// *******************************************************************************
// NgBootstrap

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

// *******************************************************************************
// Libs

import Swal from "sweetalert2";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { ToastrModule } from "ngx-toastr";
import { ConfirmationPopoverModule } from "angular-confirmation-popover";
import { ContextMenuModule } from "ngx-contextmenu";
import { AgmCoreModule } from "@agm/core";
import { BlockUIModule } from "ng-block-ui";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { DragulaModule } from "ng2-dragula";

// *******************************************************************************
// App

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { AppService } from "./app.service";
import { LayoutModule } from "./layout_app/layout_app.module";
import { ThemeSettingsModule } from "../vendor/libs/theme-settings/theme-settings.module";
import { HttpClientModule } from "@angular/common/http";

// *******************************************************************************
// Ngx-SweetAlert2
export async function provideSwal() {
  return Swal.mixin({
    buttonsStyling: false,
    customClass: {
      confirmButton: "btn btn-lg btn-primary",
      cancelButton: "btn btn-lg btn-default"
    }
  });
}

// *******************************************************************************
//

@NgModule({
  declarations: [AppComponent, NotFoundComponent],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    LayoutModule,
    HttpClientModule,

    // App
    AppRoutingModule,
    LayoutModule,
    ThemeSettingsModule,

    // Libs
    SweetAlert2Module.forRoot({ provideSwal }),
    ToastrModule.forRoot({
      toastClass: "toast"
    }),
    ConfirmationPopoverModule.forRoot({
      cancelButtonType: "default btn-sm",
      confirmButtonType: "primary btn-sm"
    }),
    ContextMenuModule.forRoot(),
    AgmCoreModule.forRoot({
      /* NOTE: When using Google Maps on your own site you MUST get your own API key:
               https://developers.google.com/maps/documentation/javascript/get-api-key
               After you got the key paste it in the URL below. */
      apiKey: "AIzaSyCHtdj4L66c05v1UZm-nte1FzUEAN6GKBI"
    }),
    BlockUIModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    DragulaModule.forRoot()
  ],

  providers: [Title, AppService],

  bootstrap: [AppComponent]
})
export class AppModule {}
