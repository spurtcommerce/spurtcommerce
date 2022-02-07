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
import { Router } from '@angular/router';
import { EmailTempSandbox } from '../../../../../../../../core/admin/settings/localizations/emailtemplate/emailtemp.sandbox';
import { EmailTempService } from '../../../../../../../../core/admin/settings/localizations/emailtemplate/emailtemp.service';

@Component({
  selector: 'app-spurt-listemailtemp',
  templateUrl: 'list.component.html',
  styles: [`
  .settings-right-wrapper {
    margin-top: 0px !important;
}`]
})
export class EmailTempListComponent implements OnInit {
  public popoverContent: any;
  public pageSize: any = 10;
  public index = 0;
  private keyword = '';
  private offset: number;
  private pagenationcount = true;

  constructor(
    private router: Router,
    public sandbox: EmailTempSandbox,
    public service: EmailTempService
  ) {
    this.regSubscribeEvents();
  }

  // initially calls getemailtempList with argument (offset)
  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.getemailtempList(this.offset, this.pageSize);
  }

  // STYLING PUROPOSE
  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  /**
   * Handles form 'list' event. Calls sandbox EmailTemp list function .
   *
   * @param params storing entire value
   */
  getemailtempList(offset: number = 0, pageSize) {
    const params: any = {};
    params.limit = pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    this.sandbox.getemailtemplist(params);
    if (this.pagenationcount) {
      params.count = 'true';
      this.sandbox.emailtemppagination(params);
    }
  }

  // Add Email Temp navigate to Add Form
  addNewEmailTemp() {
    this.service.setemailtemplistdata('');
    this.router.navigate(['/settings/local/emailtemp/add']);
  }

  // Edit EmailTemp navigate to Add Form
  editEmailtemp(list) {
    this.service.setemailtemplistdata(list);
    this.router.navigate([
      '/settings/local/emailtemp/edit',
      list.emailTemplateId
    ]);
  }

  // Delete EmailTemp using emailtempId
  deleteEmailtemp(emailTemplateId, deletePop) {
    event.stopPropagation();
    this.popoverContent = deletePop;
    this.sandbox.emailtempDelete({ emailTemplateId: emailTemplateId });
  }

  // Delete After subscribe the Result
  regSubscribeEvents() {
    this.sandbox.getdeleteemailtemp$.subscribe(_delete => {
      if (_delete && _delete.status === 1) {
        this.getemailtempList(this.offset, this.pageSize);
      }
    });
  }

  // Pagination Count
  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.getemailtempList(this.offset, this.pageSize);
  }
}
