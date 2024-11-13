/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Validators, UntypedFormBuilder, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { CurrencySymbolPipe } from '../../../../../../../../src/theme/default/admin/shared/components/pipes/currency-symbol.pipe';
import { FailedOrderSandbox } from '../../../../../../../../src/core/admin/sales/failed-order/failed-order-sandbox';
import { LayoutSandbox } from '../../../../../../../../src/core/admin/layout/layout.sandbox';
import { OrderstatusSandbox } from '../../../../../../../../src/core/admin/settings/localizations/orderstatus/orderstatus.sandbox';
import { environment } from '../../../../../../../../src/environments/environment';
import { FailedOrderModalComponent } from '../failed-order-model/failed-order-model.component';


@Component({
  selector: 'app-sales-order-vieworders',
  templateUrl: 'vieworders.component.html',
  styleUrls: ['./vieworders.component.scss'],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #009efb;
        color: white;
      }

      .dark-modal .close {
        color: white;
      }

      .light-blue-backdrop {
        background-color: #5cb3fd;
      }

      .image-manager .modal-dialog {
        max-width: 70%;
      }
    `
  ],
  providers: [DatePipe, CurrencySymbolPipe]
})
export class ViewFailedOrdersComponent implements OnInit {

  public orderId: any;
  public orderStatus: any;
  public orderDetails: any = [];
  public orderStatusId: number;
  public isDisabled: boolean;
  public symbolSettings: any;
  public orderDetail: any;
  public productDetail: any;
  public shippingForm: UntypedFormGroup;
  public getDetailLoading = false;
  public selectedPaidValue: any;
  public imageUrl: any;
  // currency
  public currency = JSON.parse(sessionStorage.getItem('adminCurrency'));



  constructor(
    private route: ActivatedRoute,
    public orderSandbox: FailedOrderSandbox,
    public layoutSandbox: LayoutSandbox,
    public orderStatusSandbox: OrderstatusSandbox,
    public datePipe: DatePipe,
    public modalService: NgbModal,
    public formbuilder: UntypedFormBuilder
  ) {}

  ngOnInit() {
    this.imageUrl = environment.imageUrl;
    this.initShippingForm();
    this.isDisabled = false;
    this.getorderstatuslist();
    this.orderId = this.route.snapshot.paramMap.get('orderId');
    this.subscribe();
  }

  getorderstatuslist() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.keyword = '';
    params.status = 1;
    this.orderStatusSandbox.orderStatusList(params);
  }

  subscribe() {
    this.route.params.subscribe(data => {
      if (data) {
        const param: any = {};
        param.orderId = this.orderId;
        this.orderSandbox.viewOrderdetails(param);
        this.orderSandbox.viewOrderDetails$.subscribe(value => {
          if (value && value.orderStatusId) {
            this.selectedPaidValue = value.paymentStatus;
            this.orderDetail = value;
            this.productDetail = value.productList[0];
            this.setShippingInfo(this.productDetail);
            if (value.productList[0] && value.productList[0].orderOptions) {
              this.orderDetails = value.productList[0].orderOptions;
            }
            this.orderStatusId = value.orderStatusId;
            if (this.orderStatusId === 2) {
              this.isDisabled = true;
            }
          }
        });
      }
    });
  }

  onItemChange(data) {
    const params: any = {};
    params.orderId = this.orderId;
    params.orderStatusId = data;
  }

  onItemProductChange(data, id) {
    const params: any = {};
    params.id = id;
    params.orderStatusId = data;
    this.orderStatusSandbox.updateProductOrderStatus(params);
    this.orderStatusSandbox.OrderstatusUpdateProductLoaded$.subscribe(datas => {
      if (datas === true) {
        const param: any = {};
        param.orderId = this.orderId;
        this.orderSandbox.viewOrderdetails(param);
      }
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getOrderDetails(detail) {
    this.getDetailLoading = true;
    this.productDetail = detail;
  }

  initShippingForm() {
    this.shippingForm = this.formbuilder.group({
      id: ['', Validators.required],
      url: ['', Validators.required]
    });
  }

  updateShippingInfo() {
    if (!this.shippingForm.valid) {
      this.validateAllFormFields(this.shippingForm);
      return;
    }
    const params: any = {};
    params.orderProductId = this.productDetail.orderProductId;
    params.trackingUrl = this.shippingForm.controls['url'].value;
    params.trackingNo	 = this.shippingForm.controls['id'].value;
    this.orderStatusSandbox.updateProductTrackingStatus(params);
    this.orderStatusSandbox.TrackingstatusUpdateProductLoaded$.subscribe(data => {
      if (data) {
        const param: any = {};
        param.orderId = this.orderId;
        this.orderSandbox.viewOrderdetails(param);
      }
    });
  }

  validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  setShippingInfo(data) {
    this.shippingForm.controls['id'].setValue(data['trackingNo']);
    this.shippingForm.controls['url'].setValue(data['trackingUrl']);
  }

  moveToMainOrder(list) {
    const modalRef = this.modalService.open(FailedOrderModalComponent, {
        windowClass: 'add-local', centered: true});
        modalRef.componentInstance.params = list;
        modalRef.result.then((result) => {
          if (result) {
          }
        });
  }

}
