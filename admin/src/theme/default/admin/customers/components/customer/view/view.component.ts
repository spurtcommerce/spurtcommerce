/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
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
  // currency
  public currencyCode: string;
  public symbolRight: string;
  public symbolLeft: string;

  constructor(
    public sandbox: CustomerSandbox,
    private configService: ConfigService,
    private route: ActivatedRoute
  ) {}

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  ngOnInit() {
    if (localStorage.getItem('symbolRight')) {
      this.symbolRight = localStorage.getItem('symbolRight');
    }
    if (localStorage.getItem('symbolLeft')) {
      this.symbolLeft = localStorage.getItem('symbolLeft');
    }
    this.postImageUrl = './assets/img/avatar-img1.png';
    this.id = this.route.snapshot.paramMap.get('id');
    this.imageUrl = this.configService.getImageUrl();
    this.getViewCustomer();
  }

  // Get View Customer
  getViewCustomer() {
    const params: any = {};
    params.id = this.id;
    this.sandbox.ViewCustomerDetail(params);
  }

  // View Customer Image Loader
  viewCustomerImageLoading(id) {
    this.viewCustomerListImage[id] = true;
  }
}
