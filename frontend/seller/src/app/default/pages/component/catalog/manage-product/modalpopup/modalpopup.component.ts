import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductSandbox } from '../../../../../../core/product/product.sandbox';
import { Subscription } from 'rxjs';
//  import { PricingGroupService } from '../../../../../../../../add-ons/pricing/pricing-list/pricing-group-services';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.scss'],
  providers: []

})
export class ModalPopupComponent implements OnInit {

  // Subscriptions
  private subscriptions: Subscription = new Subscription();
  productId: number;
  key: any;
  couponId: number;
  cancel: any;
  @Input() deleteMessage: string
  @Input() VariantMessage: string
  constructor(public activeModal: NgbActiveModal, public productSandbox: ProductSandbox) {

  }
  ngOnInit() {

  }
  close() {
    this.activeModal.close();
  }
  deleteContent() {
    if (this.key === 'vendor') {
      const params: any = {};
      params.vendorCouponId = this.couponId;
     

    }

    if (this.key === 'pricing') {
      // this.pricingGroupService.pricingGroupDelete(this.couponId).subscribe(res=> {
      //   if(res?.status == 1) {
      //     this.activeModal.close('deleted');
      //   }
      // })
    }

    if (!['', null, undefined].includes(this.VariantMessage)) {
      if (this.VariantMessage == 'SKU' || 'Variant') {
        this.activeModal.close('Deleted');
      }
    }

    else {
      this.activeModal.close('deleted');

    }
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}