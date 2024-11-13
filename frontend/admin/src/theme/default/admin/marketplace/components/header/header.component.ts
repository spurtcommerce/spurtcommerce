/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
 * Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  HostListener,
  ChangeDetectorRef,
} from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "app-vendor-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendorHeaderComponent implements OnInit {
  checked: boolean;
  checked1: boolean;
  salesChecked: boolean;
  reportsChecked: boolean;
  public url: any;
  settlementsChecked: boolean;
  onBoarding: Boolean;
  constructor(
    public titleService: Title,
    public router: Router,
    private cd: ChangeDetectorRef
  ) {}

  @HostListener("document:click", ["$event"]) onDocumentClick(event) {
    this.onBoarding = false;
    this.checked = false;
    this.checked1 = false;
    this.salesChecked = false;
    this.reportsChecked = false;
    this.settlementsChecked = false;
  }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const urlTree = this.router.parseUrl(val.url);
        const urlSegments = urlTree.root.children["primary"].segments.map(
          (segment) => segment.path
        );
        this.url = `/${urlSegments[0]}/${urlSegments[1]}`;
        this.cd.detectChanges();
      }
    });

    // this.titleService.setTitle('Vendors');
  }

  selectSubmenu() {}
  onClickOnBoard(e){
    this.onBoarding = true;
    this.checked = false;
    this.checked1 = false;
    this.salesChecked = false;
    this.reportsChecked = false;
    this.settlementsChecked = false;
  }

  onClick(e) {
    this.onBoarding = false;
    this.checked = true;
    this.checked1 = false;
    this.salesChecked = false;
    this.reportsChecked = false;
    this.settlementsChecked = false;
  }

  onClick1(e) {
    this.onBoarding = false;
    this.checked1 = true;
    this.checked = false;
    this.salesChecked = false;
    this.reportsChecked = false;
    this.settlementsChecked = false;
  }

  onClickSales(e) {
    this.onBoarding = false;
    this.checked1 = false;
    this.checked = false;
    this.salesChecked = true;
    this.reportsChecked = false;
    this.settlementsChecked = false;
  }

  onClickSettlements(e) {
    this.onBoarding = false;
    this.checked1 = false;
    this.checked = false;
    this.salesChecked = false;
    this.reportsChecked = false;
    this.settlementsChecked = true;
  }

  onClickReports(e) {
    this.onBoarding = false;
    this.checked1 = false;
    this.checked = false;
    this.salesChecked = false;
    this.reportsChecked = true;
    this.settlementsChecked = false;
  }

  sales(val) {
    this.router
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.router.navigate([val]));
  }
}
