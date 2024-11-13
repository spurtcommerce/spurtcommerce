/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { PagesSandbox } from '../../../../../../core/admin/cms/pages/pages.sandbox';

@Component({
  selector: 'app-pages-layout',
  templateUrl: './pages-layout.component.html',
  styleUrls: ['./pages-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagesLayoutComponent implements OnInit {
  public id:any;
  constructor(public pageSandbox: PagesSandbox, public router:Router
    ) {
      this.router.events.subscribe((url:any) => {
        this.id=+this.router.url.split('?')[0].split('/').pop()
      }); 
    }
  ngOnInit() {
    this.getPagesLists();
  }
  getPagesLists() {
    this.pageSandbox.getPagePagination({ count: 1 });
    this.pageSandbox.getPageCount();
  }
}
