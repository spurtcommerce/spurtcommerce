import { ActivatedRoute, Router, } from '@angular/router';
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
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
  public id:any;
  constructor(
    public layoutSandbox: LayoutsSandbox,
    public router:Router
  ) {
    this.router.events.subscribe((url:any) => {
          this.id=+this.router.url.split('?')[0].split('/').pop()
        }); 
  }

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
