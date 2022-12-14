/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PagesSandbox } from 'src/core/admin/cms/pages/pages.sandbox';
import { PageGroupSandbox } from '../../../../../../../core/admin/cms/page-group/page-group.sandbox';

@Component({
  selector: 'app-pageGroup-layout',
  templateUrl: './pageGroup-layout.component.html',
  styleUrls: ['./pageGroup-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageGroupLayoutComponent implements OnInit {
  constructor(public pageGroupSandbox: PageGroupSandbox,public pageSandbox:PagesSandbox ) {}
  ngOnInit() {
    this.getPageGroupLists();
  }
  getPageGroupLists() {
    // this.pageSandbox.getPagePagination({ count: 1 });
    this.pageGroupSandbox.getPageGroupCount();
  }
}
