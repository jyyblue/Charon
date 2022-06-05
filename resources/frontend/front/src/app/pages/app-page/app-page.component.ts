import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-app-page",
  templateUrl: "./app-page.component.html",
  styleUrls: ["./apppage.component.scss"]
})
export class AppPageComponent implements OnInit {
  constructor(private router: Router) {
    this.dashboard("c");
  }

  ngOnInit(): void {}
  dashboard(value) {
    if (value == "c") {
      this.router.navigate(["admin/dashboard"]);
    }
    if (value == "a") {
      this.router.navigate(["aers/list"]);
    }
  }
}
