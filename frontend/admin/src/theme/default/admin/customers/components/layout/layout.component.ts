/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutSandbox } from '../../../../../../core/admin/Customers/layout/layout.sandbox';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerLayoutComponent implements OnInit {
  public id : any;

  constructor(public layoutSandbox: LayoutSandbox,public router:Router) {
    this.router.events.subscribe((url:any) => {
      this.id=+this.router.url.split('?')[0].split('/').pop()
    }); 
  }

  ngOnInit() {
    this.layoutSandbox.getCustomerCount();
  }
}
