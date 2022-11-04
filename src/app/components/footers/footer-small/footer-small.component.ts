import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-footer-small",
  templateUrl: "./footer-small.component.html",
})
export class FooterSmallComponent implements OnInit {
  date = new Date().getFullYear();

  constructor() {}

  ngOnInit(): void {}
}
