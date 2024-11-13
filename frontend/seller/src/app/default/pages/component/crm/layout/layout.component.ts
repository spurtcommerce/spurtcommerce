import { Component, OnInit } from '@angular/core';
import { QuestionAnswerproductListRoutes } from '../../../../../../../add-ons/add-ons.constant';
import { CrmRatingAndReviewRoutes } from '../../../../../../../add-ons/add-ons.constant';
import { CommonSandbox } from '../../../../../../../src/app/core/common/common.sandbox';
import { Subscription } from 'rxjs';
import { ApprovalFlagService } from '../../../../../../../src/app/default/shared/components/approvalServices/approval-flag.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public sideMenuOpen = true;
  ratingAndReviewAddon = CrmRatingAndReviewRoutes?.length > 0;
  questionAnswerAddon = QuestionAnswerproductListRoutes?.length > 0;
  allowUnapprovedSeller: any;
  vendorDetails: any
  // Subscriptions
  private subscriptions: Subscription = new Subscription();
  constructor(public commonSandbox: CommonSandbox, public approvalService: ApprovalFlagService) { }

  ngOnInit(): void {

    // Approval Status from services



    let setting = JSON.parse(localStorage.getItem('vendor-settings'))
    // Approval Status from services
    this.approvalService.mySubject$.subscribe((value: any) => {
      if (setting?.kycMandate == 1) {
        this.allowUnapprovedSeller = value?.approvalStatus;
      } else {
        this.allowUnapprovedSeller = false;
      }
    });

    // let settingData =JSON.parse(localStorage.getItem('vendor-settings'))
    // let VendorData=JSON.parse(localStorage.getItem('vendorUser'))
    // this.allowUnapprovedSeller = [0,2,3].includes(VendorData.approvalFlag) &&settingData.allowUnapprovedSeller == 0 ? true : false;



  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

}
