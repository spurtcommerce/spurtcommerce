/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { LayoutsSandbox } from '../../../../../../core/admin/catalog/layout/layout.sandbox';

@Component({
  selector: 'app-catalog-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogLayoutComponent implements OnInit {
  constructor(
    public layoutSandbox: LayoutsSandbox,
  ) {}

  /**
   * Handles form 'ngOnInit' event. calls layoutSandbox(getProductListCount,getActiveProductListCount
   *getInActiveProductListCount,getCatagoryListCount,getFeaturedProductListCount).
   *
   * @param count default value.
   * @param status default value.
   */
  ngOnInit() {
    this.layoutSandbox.getCatalogCount();
  }
}
