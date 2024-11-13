/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CustomerSandbox } from '../../../../../../../../core/admin/Customers/customers/customer.sandbox';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../../../../../../core/admin/service/config.service';

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
  pageSize: number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;
  pageSize2: number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;
  public pageoffset = 0;
  offset: number = 0;
  currentPage: number = 1;
  currentPage2 = 1;
  offset2: number = 0;
  email: any;

  constructor(
    public titleService: Title,
    public sandbox: CustomerSandbox,
    private configService: ConfigService,
    private route: ActivatedRoute
  ) { 
    this.route.queryParamMap.subscribe((params: any) => {
      this.email = params.params.email;
    });
    this.titleService.setTitle('Buyer');
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
    this.offset = (this.currentPage - 1) * this.pageSize;
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.count = 0;
    params.customerId = this.id;
    this.sandbox.viewCustomerProduct(params);
    this.sandbox.viewCustomerProduct$.subscribe(val => {
      if(val){
        val?.forEach(element => {
          element.truncatedText = element?.productName?.length > 80 ? element?.productName.slice(0, 80) : element?.productName;
        });
      }
    })
  }

  getOrderProduct() {
    this.offset2 = (this.currentPage2 - 1) * this.pageSize2;
    const params: any = {};
    params.limit = this.pageSize2;
    params.offset = this.offset2;
    params.count = 0;
    // params.customerId = this.id;
    params.emailId = this.email;
    this.sandbox.viewOrderProduct(params);
    this.sandbox.viewOrderProduct$.subscribe(val => {
      if(val){
        val?.forEach(element => {
          element.truncatedText = element?.productName?.length > 50 ? element?.productName.slice(0, 50) : element?.productName;
        });
      }
    })
  }

  getViewProductcount() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.count = 1;
    params.customerId = this.id;
    this.sandbox.viewCustomerProductCount(params);

  }
  getOrderProductCount() {
    const params: any = {};
    params.limit = this.pageSize2;
    params.offset = this.offset2;
    params.count = 1;
    // params.customerId = this.id;
    params.emailId = this.email
    this.sandbox.viewOrderProductCount(params);
  }

  onPageChange(event: { offset: number; limit: number }): void {
      this.pageSize = event.limit;
      this.currentPage = Math.floor(event.offset / event.limit) + 1;
      this.getViewProduct();
  }

  onPageChange2(event: { offset: number; limit: number }): void {
    this.pageSize2 = event.limit;
    this.currentPage2 = Math.floor(event.offset / event.limit) + 1;
    this.getOrderProduct();
  }



  orderProductPageChange(event: any) {
    this.pageoffset = (event.pageSize * event.pageIndex);
    this.pageSize = event.pageSize;
    const offset = event.pageSize * event.pageIndex;
    this.getOrderProduct();
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
