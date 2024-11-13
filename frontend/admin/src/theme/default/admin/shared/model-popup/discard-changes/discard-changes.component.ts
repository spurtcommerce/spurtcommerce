import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerSandbox } from 'src/core/admin/vendor/pages/seller/seller.sandbox';
import { VendorProductSandbox } from 'src/core/admin/vendor/pages/vendor-product/vendor-product.sandbox';

@Component({
  selector: 'app-discard-changes',
  templateUrl: './discard-changes.component.html',
  styleUrls: ['./discard-changes.component.scss']
})
export class DiscardChangesComponent implements OnInit {

  key: any;
  id: number;
  @Input() deleteMessage:''
  constructor(public activeModal: NgbActiveModal, public sellerSandbox: SellerSandbox, public productSandbox: VendorProductSandbox) { }

  ngOnInit() {
  }
  // modal close event
  close() {
    this.activeModal.close();
  }
  deleteContent() {
    if (this.key === 'vendor') {
      this.sellerSandbox.deleteSeller({ vendorId: this.id });
      this.sellerSandbox.deleteLoaded$.subscribe(_delete => {
        if (_delete === true) {
          this.activeModal.close('deleted');
        }
      });
    } else if (this.key === 'product') {
      this.productSandbox.doProductDelete({ productId: this.id });
      this.productSandbox.productDeleteLoaded$.subscribe(_delete => {
        if (_delete === true) {
          this.activeModal.close('deleted');
        }
      });
    } else {
      this.activeModal.close('deleted');
    }
  }
}
