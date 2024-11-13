import { Component, OnInit } from '@angular/core';
import { ImageDataService } from '../imageFlagServices';
import { CommonSandbox } from '../../../../../../../src/app/core/common/common.sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class MyAccountLayoutComponent implements OnInit {

  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  ImageFlag: any;
  email: any;


  constructor(public CommonSandbox: CommonSandbox) { }

  ngOnInit(): void {
    this.getVendorProfile()
  }

  getVendorProfile() {


    this.CommonSandbox.doGetProfile();
    this.subscriptions.add(this.CommonSandbox.getProfile$.subscribe((val: any) => {
      if (val?.verification?.companyDetail == 0 || val?.verification?.bankAccount == 0 || val?.verification?.document == 0) {
        this.ImageFlag = 0
      } else {
        this.ImageFlag = 1
      }
      if (val?.verification?.email == 1 && !['', null, undefined].includes(val?.customerDetail.mobileNumber)) {
        this.email = 1
      } else {
        this.email = 0
      }

    }))
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

}
