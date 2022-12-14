/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { CustomerSandbox } from '../../../../../../../core/admin/Customers/customers/customer.sandbox';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../../../../../core/admin/service/config.service';

@Component({
  selector: 'app-customer-view',
  templateUrl: 'view.component.html',
  styleUrls: ['./view.component.scss']
})
export class CustomerViewComponent implements OnInit {

  public id: string;
  public imageUrl: string;
  public postImageUrl: string;
  public viewCustomerListImage = {};
  public currencyCode: string;
  public symbolRight: string;
  public symbolLeft: string;
  public pageSize = '10';
  public pageoffset = 0;




  constructor(
    public sandbox: CustomerSandbox,
    private configService: ConfigService,
    private route: ActivatedRoute
  ) { }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  ngOnInit() {
    if (sessionStorage.getItem('symbolRight')) {
      this.symbolRight = sessionStorage.getItem('symbolRight');
    }
    if (sessionStorage.getItem('symbolLeft')) {
      this.symbolLeft = sessionStorage.getItem('symbolLeft');
    }
    this.postImageUrl = './assets/img/avatar-img1.png';
    this.id = this.route.snapshot.paramMap.get('id');
    this.imageUrl = this.configService.getImageUrl();
    this.getViewCustomer();
    this.getViewProduct();
    this.getOrderProduct();
    this.getViewProductcount();
    this.getOrderProductCount();
  }

  getViewProduct(offset: number = 0) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.count = 0;
    params.customerId = this.id;
    this.sandbox.viewCustomerProduct(params);
  }
  getOrderProduct(offset: number = 0) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.count = 0;
    params.customerId = this.id;
    this.sandbox.viewOrderProduct(params);
  }
  getViewProductcount(offset: number = 0) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.count = 1;
    params.customerId = this.id;
    this.sandbox.viewCustomerProductCount(params);

  }
  getOrderProductCount(offset: number = 0) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.count = 1;
    params.customerId = this.id;
    this.sandbox.viewOrderProductCount(params);
  }


  onPageChange(event) {
    this.pageoffset = (event.pageSize * event.pageIndex);
    this.pageSize = event.pageSize;
    const offset = event.pageSize * event.pageIndex;
    this.getViewProduct(offset);
  }

  orderProductPageChange(event: any) {
    this.pageoffset = (event.pageSize * event.pageIndex);
    this.pageSize = event.pageSize;
    const offset = event.pageSize * event.pageIndex;
    this.getOrderProduct(offset);
  }

  // Get View Customer
  getViewCustomer() {
    const params: any = {};
    params.id = this.id;
    this.sandbox.viewCustomerDetail(params);
  }

  // View Customer Image Loader
  viewCustomerImageLoading(id) {
    this.viewCustomerListImage[id] = true;
  }
}
