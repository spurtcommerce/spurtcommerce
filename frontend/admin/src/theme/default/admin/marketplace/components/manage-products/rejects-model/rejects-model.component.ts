import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SellerProductSandox } from 'src/core/admin/vendor/manage-products/sellerProduct/sellerProduct.sandbox';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rejects-model',
  templateUrl: './rejects-model.component.html',
  styleUrls: ['./rejects-model.component.scss']
})
export class RejectsModelComponent implements OnInit {

  @Input() fullData: any;
  @Input() sellerId: any;
  rejectReason: any = "";
  submitted: boolean = false;
  public imageUrl: any;
  // currency
  public currency = JSON.parse(sessionStorage.getItem('adminCurrency'));
  defaultImage: any;


  constructor(private modalService: NgbActiveModal, public sandbox: SellerProductSandox) { }

  ngOnInit(): void {
    this.imageUrl = environment.imageUrl;
    this.defaultImage = this.fullData?.productImage?.find(image => image.defaultImage === 1);
  }


  Submit() {
    this.submitted = true;
    if (['', null, undefined].includes(this.rejectReason)) {
      return
    }
    const param = {
      productIds: this.fullData.productId,
      approvalFlag: '2',
      reason: this.rejectReason
    }

    this.sandbox.rejectProduct(param);
    this.sandbox.rejectProduct$.subscribe(val => {
      if (val?.status == 1) {
        this.close('success')
      }
    })
  }

  close(type = 'dismiss') {
    this.modalService.close(type);
  }
}
