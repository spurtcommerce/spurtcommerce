/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrdersSandbox } from '../../../../../../../../../../core/admin/vendor/vendor-sales/orders/orders.sandbox';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../../../../../../../../core/admin/service/config.service';
import { Subscription } from 'rxjs';
import { LayoutSandbox } from '../../../../../../../../../../core/admin/layout/layout.sandbox';
// import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-vendor-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss']
})
export class OrdersDetailComponent implements OnInit, OnDestroy {


  public orderId: any;
  public orderDetail: any;
  public ImageUrl: any = '';
  public productDetails: any;
  private subscriptions: Array<Subscription> = [];
  public downloadStart = false;
  public selectInvoice:any;
  ordershistory: any;
  productDetail: any;
  // public config: SwiperConfigInterface = {};
  // private pagination: SwiperPaginationInterface = {
  //   el: '.swiper-pagination',
  //   clickable: true 
  // };
// currency
public currency = JSON.parse(sessionStorage.getItem('adminCurrency'));


  constructor(public orderSandbox: OrdersSandbox, public layoutSandbox: LayoutSandbox, public configService: ConfigService, public route: ActivatedRoute) {
    this.route.params.subscribe(data => {
      if (data) {
        this.orderId = data.id;
        this.getOrderDetail();
        this.selectInvoice=null;
      }
    });
    this.subscriptions.push(this.orderSandbox.getOrderDetail$.subscribe(datas => {
      if (datas) {
        this.orderDetail = datas;
        this.productDetails = datas.productList[0];
        this.getOrderLogList();
        this.getOrderStatusList();
      }
    }));
  }

  ngOnInit() {
    this.ImageUrl = this.configService.getImageUrl();
  }

  ngAfterViewInit() {
    // this.config = {
    //   observer: true,
    //   slidesPerView: 5,
    //   spaceBetween: 1,
    //   keyboard: true,
    //   navigation: true,
    //   pagination: false,
    //   grabCursor: true,
    //   autoplay: false,
    //   speed: 900,
    //   effect: 'slide',
    //   breakpoints: {
    //     510: {
    //       slidesPerView: 1
    //     },
    //     850: {
    //       slidesPerView: 2
    //     },
    //     1100: {
    //       slidesPerView: 3
    //     },
    //     1280: {
    //       slidesPerView: 4
    //     },
    //     1500: {
    //       slidesPerView: 5
    //     }
    //   }
    // };
  }

  closeorderhistory(){
    this.ordershistory=0;
  }

  changeStatus(statusId, orderId) {
    const params: any = {};
    params.orderId = orderId;
    params.orderStatusId = statusId;
    this.orderSandbox.orderStatusChange(params);
    this.orderSandbox.getOrderStatusChangeLoaded$.subscribe(data => {
      if (data === true) {
        this.getOrderDetail();
      }
    });
  }

  getOrderDetail() {
    const params: any = {};
    params.orderId = this.orderId;
    this.orderSandbox.orderDetail(params);
  }

  downloadInvoice(list) {
    const params: any = {};
    params.orderId = this.orderId;
    params.vendorId = list.vendorId;
    params.orderPrefixId = this.orderDetail.orderPrefixId;
    this.orderSandbox.downloadInvoice(params);
  }
  onChange(event) {
    const params: any = {};
    params.orderId = this.orderId;
    params.vendorId = event.vendorId;
    params.orderPrefixId = this.orderDetail.orderPrefixId;
    this.orderSandbox.downloadInvoice(params);
  }
  viewDetail(details) {
    this.productDetails = details;
    this.getOrderLogList();
  }

    ordersstatushistory(details){
    this.ordershistory=details;
    this.productDetail = details;
    this.getOrderLogList();
  }

  getOrderLogList() {
    const params: any = {};
    params.vendorOrderId = this.productDetails.vendorOrderId;
    this.orderSandbox.ordersLogList(params);
  }

  getOrderStatusList() {
    const params: any = {};
    this.orderSandbox.ordersStatusList(params);
  }

  changePayment() {
    const params: any = {};
    params.orderId = this.orderId;
    params.paymentStatusId = 1;
    this.layoutSandbox.getChangePayment(params);
    this.layoutSandbox.changePaymentLoaded$.subscribe(data => {
      if (data === true) {
        const param: any = {};
        param.orderId = this.orderId;
        this.orderSandbox.orderDetail(param);
      }
    });
  }



  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
