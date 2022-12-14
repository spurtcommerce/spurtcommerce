/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {
  Component,
  OnInit,
} from '@angular/core';
import { LayoutsSandbox } from '../../../../../../../core/admin/sales/layout/layout.sandbox';
import { LayoutSandbox } from '../../../../../../../core/admin/layout/layout.sandbox';


@Component({
  selector: 'app-sales-count',
  templateUrl: 'count.component.html',
  styleUrls: ['count.component.scss']
})
export class SalesCountComponent implements OnInit {


  constructor(public layoutSandbox: LayoutsSandbox,
    public commonSandbox: LayoutSandbox) {
  }

  ngOnInit() {
    this.layoutSandbox.getSalesCount();
  }

}
