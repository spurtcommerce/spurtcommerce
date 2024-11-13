import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { relatedProductsRoutes, commonProductComponentRoutes } from '../../../../../../../add-ons/add-ons.constant';
import { CommonSandbox } from '../../../../../../../src/app/core/common/common.sandbox';
import { Subscription } from 'rxjs';
import { ApprovalFlagService } from '../../../../../../../src/app/default/shared/components/approvalServices/approval-flag.service';
// import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  // public config: SwiperConfigInterface = {};
  // Subscriptions
  private subscriptions: Subscription = new Subscription();
  config: any;
  public sideMenuOpen = true;
  public status: any
  public val = true;
  public id: any;
  addOnsRouteProduct = commonProductComponentRoutes.length > 0;
  addOnsRoute = relatedProductsRoutes.length > 0;
  allowUnapprovedSeller: any;
  arr: any = ['successfull', 'products-list', 'failed', 'categoriesedit', 'product-details-edit', 'pricing-setup-edit']

  constructor(public router: ActivatedRoute, public route: Router, public commonSandbox: CommonSandbox, public approvalService: ApprovalFlagService) { }

  ngOnInit(): void {
    this.router.snapshot.routeConfig.children.forEach((val) => {
      if (this.arr.includes(val?.data?.ActiveStatus)) {
        this.status = 'active'
      }
    })

    let setting = JSON.parse(localStorage.getItem('vendor-settings'))
    // Approval Status from services
    this.approvalService.mySubject$.subscribe((value: any) => {
      if (setting?.kycMandate == 1) {
        this.allowUnapprovedSeller = value?.approvalStatus;
      } else {
        this.allowUnapprovedSeller = false;
      }
    });



  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

}
