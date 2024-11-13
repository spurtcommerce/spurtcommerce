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
import { PagesSandbox } from 'src/core/admin/cms/pages/pages.sandbox';
import { PageGroupSandbox } from '../../../../../../../core/admin/cms/page-group/page-group.sandbox';

@Component({
  selector: 'app-pageGroup-layout',
  templateUrl: './pageGroup-layout.component.html',
  styleUrls: ['./pageGroup-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageGroupLayoutComponent implements OnInit {
  public id: any;
  getPageGroupCount: any;
  constructor(public pageGroupSandbox: PageGroupSandbox,public pageSandbox:PagesSandbox, public router:Router) {
    this.router.events.subscribe((url:any) => {
      this.id=+this.router.url.split('?')[0].split('/').pop()
    }); 
  }
  ngOnInit() {
    this.getPageGroupLists();
    // this.getPageGroupCount();
  }
  getPageGroupLists() {
    // this.pageSandbox.getPagePagination({ count: 1 });
    this.pageGroupSandbox.getPageGroupCount();
  }
}
