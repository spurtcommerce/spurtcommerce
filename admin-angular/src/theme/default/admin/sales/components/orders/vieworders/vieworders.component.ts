/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { OrdersSandbox } from '../../../../../../../core/admin/sales/orders/orders-sandbox';
import { OrderstatusSandbox } from '../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { DatePipe } from '@angular/common';
import { ConfigService } from '../../../../../../../core/admin/service/config.service';
import { CurrencySymbolPipe } from '../../../../shared/components/pipes/currency-symbol.pipe';
import { LayoutSandbox } from '../../../../../../../core/admin/layout/layout.sandbox';
import { Observable, Observer } from 'rxjs';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sales-order-vieworders',
  templateUrl: 'vieworders.component.html',
  styleUrls: ['./vieworders.component.scss'],
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
export class ViewOrdersComponent implements OnInit, OnDestroy {

  public orderId: any;
  private closeResult: string;
  private invoiceDetail: any;
  private dynamicBody: any = {};
  private docDefinition: any = {};
  private pdf: any;
  private invoice: any;
  private imageUrl: string;
  public orderStatus: any;
  public orderDetails: any = [];
  public orderStatusId: number;
  public isDisabled: boolean;
  public symbolSettings: any;
  private captureDataUrl: any;
  private postImage: any;
  public orderDetail: any;
  public productDetail: any;
  public shippingForm: FormGroup;
  public getDetailLoading = false;
  public selectedPaidValue=false;
  private subscriptions: Array<Subscription> = [];
  public queryData: any = {};
  orderstatusmodel: any= 0;
  shippingmodel: any = 0;
  ordershistory: any=0;
  constructor(
    private modalService: NgbModal,
    private modalService2: NgbModal,
    private route: ActivatedRoute,
    public orderSandbox: OrdersSandbox,
    public layoutSandbox: LayoutSandbox,
    public orderStatusSandbox: OrderstatusSandbox,
    public datePipe: DatePipe,
    private configService: ConfigService, public formbuilder: FormBuilder
  ) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const index = this.route.snapshot.queryParamMap.get('index');
    const offset = this.route.snapshot.queryParamMap.get('offset');

    this.queryData.offset = offset || 0;
    this.queryData.index = index || 0;
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  ngOnInit() {
    this.initShippingForm();
    this.imageUrl = this.configService.getImageUrl();
    this.isDisabled = false;
    this.getOrderStatusList();
    this.orderId = this.route.snapshot.paramMap.get('orderId');
    this.subscribe();
    this.orderSandbox.getSettings();
    this.captureDataUrl = 'assets/img/storelogo.png';
    this.convertBase64(this.captureDataUrl).subscribe(base64data => {
      this.postImage = 'data:image/jpg;base64,' + base64data;
    });
  }

  convertBase64(inputValue: any) {
    return Observable.create((observer: Observer<string>) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = inputValue;
      if (!img.complete) {
        // This will call another method that will create image from url
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = err => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }

  getOrderStatusList() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.keyword = '';
    params.status = 1;
    this.orderStatusSandbox.orderStatusList(params);
  }

  open2(content) {
    this.modalService
      .open(content, { windowClass: 'image-manager' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  open(content) {
    this.modalService2.open(content, {
      windowClass: 'dark-modal,image-manager'
    });
  }

  subscribe() {
    this.route.params.subscribe(data => {
      if (data) {
        const param: any = {};
        param.orderId = this.orderId;
        this.orderSandbox.viewOrderDetails(param);
        this.subscriptions.push(this.orderSandbox.viewOrderDetails$.subscribe(value => {
          if (value && value.orderStatusId) {
            this.selectedPaidValue = value.paymentStatus === 1 ? true : false;
            this.orderDetail = value;
            this.productDetail = value.productList[0];
            this.setShippingInfo(this.productDetail);
            this.getProductOrderLogList();
            if (value.productList[0] && value.productList[0].orderOptions) {
              this.orderDetails = value.productList[0].orderOptions;
            }
            this.orderStatusId = value.orderStatusId;
            if (this.orderStatusId === 2) {
              this.isDisabled = true;
            }
          }
        }));
      }
    });
  }

  onItemChange(data) {
    const params: any = {};
    params.orderId = this.orderId;
    params.orderStatusId = data;
    this.orderSandbox.changeOrderStatus(params);
  }

  onItemProductChange(data, id) {
    const params: any = {};
    params.id = id;
    params.orderStatusId = data;
    this.orderStatusSandbox.updateProductOrderStatus(params);
    this.subscriptions.push(this.orderStatusSandbox.OrderstatusUpdateProductLoaded$.subscribe(datas => {
      if (datas === true) {
        const param: any = {};
        param.orderId = this.orderId;
        this.orderSandbox.viewOrderDetails(param);
      }
    }));
  }

  changePayment(event) {
    // const FeatureValue = event.target.checked;
    // this.selectedPaidValue = value.paymentStatus === 1 ? true : false;
    const a=this.selectedPaidValue === true ? 1 : 0;
    const params: any = {};
    params.orderId = this.orderId;
    // params.paymentStatusId = +event;
    params.paymentStatusId = a;
    this.layoutSandbox.getChangePayment(params);
    this.subscriptions.push(this.layoutSandbox.changePaymentLoaded$.subscribe(data => {
      if (data === true) {
        const param: any = {};
        param.orderId = this.orderId;
        this.orderSandbox.viewOrderDetails(param);
      }
    }));
  }

  /**
   * download invoice for order
   *
   * @param dynamicBody creating dynamic body for the invoic detail
   */
  downloadInvoiceDetail(details, setting) {
    const params: any = {};
    params.orderId = details.orderId;
    params.orderPrefixId = details.orderPrefixId;
    this.orderSandbox.downloadInvoice(params);
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
    this.orderstatusmodel = detail;
    this.getDetailLoading = true;
    this.productDetail = detail;
    // this.setShippingInfo(detail);
    this.getProductOrderLogList();
  }

  initShippingForm() {
    this.shippingForm = this.formbuilder.group({
      id: ['', Validators.required],
      url: ['', Validators.required]
    });
  }

  getProductOrderLogList() {
    const params: any = {};
    params.orderProductId = this.productDetail.orderProductId;
    this.orderSandbox.orderLog(params);
  }

  updateShippingInfo() {
    if (!this.shippingForm.valid) {
      this.validateAllFormFields(this.shippingForm);
      return;
    }
    const params: any = {};
    params.orderProductId = this.productDetail.orderProductId;
    params.trackingUrl = this.shippingForm.controls['url'].value;
    params.trackingNo = this.shippingForm.controls['id'].value;
    this.orderStatusSandbox.updateProductTrackingStatus(params);
    this.subscriptions.push(this.orderStatusSandbox.TrackingstatusUpdateProductLoaded$.subscribe(data => {
      if (data) {
        const param: any = {};
        param.orderId = this.orderId;
        this.orderSandbox.viewOrderDetails(param);
      }
    }));
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  setShippingInfo(data) {
    this.shippingForm.controls['id'].setValue(data['trackingNo']);
    this.shippingForm.controls['url'].setValue(data['trackingUrl']);
  }

  closeorderstatus() {
    this.orderstatusmodel = 0;
  }
  shipping(detail) {
    this.shippingmodel = detail;
    this.productDetail = detail;
    this.setShippingInfo(detail);
    this.getProductOrderLogList();
  }
  shippingclose() {
    this.shippingmodel = 0;
  }
  ordersstatushistory(details){
    this.ordershistory=details;
    this.productDetail = details;
    this.getProductOrderLogList();
  }
  closeorderhistory(){
    this.ordershistory=0;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
