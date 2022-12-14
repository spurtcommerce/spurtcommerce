/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { EmailTempSandbox } from '../../../../../../../../core/admin/settings/localizations/emailtemplate/emailtemp.sandbox';
import { EmailTempService } from '../../../../../../../../core/admin/settings/localizations/emailtemplate/emailtemp.service';
import { EmailTempAddComponent } from '../add/add.component';
import { DeleteConfirmationDialogComponent } from '../../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';


@Component({
  selector: 'app-spurt-listemailtemp',
  templateUrl: 'list.component.html',
  styles: [`
  .settings-right-wrapper {
    margin-top: 0px !important;
}.coc{
  background: #f20a6d;
    border: solid thin #dddddd;
    color: white;
    padding: 4px 16px;
}`]
})
export class EmailTempListComponent implements OnInit {

  public popoverContent: any;
  public pageSize: any = 10;
  public index = 0;
  private keyword = '';
  private offset: number;
  private paginationCount = true;

  constructor(
    public modal: NgbModal,
    private router: Router,
    public sandbox: EmailTempSandbox,
    public service: EmailTempService
  ) {
    this.regSubscribeEvents();
  }

  ngOnInit() {
    this.pageSize = sessionStorage.getItem('itemsPerPage')
      ? sessionStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.getemailtempList(this.offset, this.pageSize);

    this.sandbox.emailTempUpdateLoaded$.subscribe(data => {
      if (data) {
        this.getemailtempList(this.offset, this.pageSize);
      }
    });
  }

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
    this.sandbox.getEmailTemplateList(params);
    if (this.paginationCount) {
      params.count = 'true';
      this.sandbox.emailTemplatePagination(params);
    }
  }

  // Add Email Temp navigate to Add Form
  addNewEmailTemp() {
    this.service.setemailtemplistdata('');
    this.router.navigate(['/settings/local/emailtemp/add']);
  }

  // Edit EmailTemp navigate to Add Form
  editEmailtemp(list) {
    const modalRef = this.modal.open(EmailTempAddComponent, {
      windowClass: 'varient', keyboard: false, backdrop: 'static'
    });
    if (list) {
      this.service.setemailtemplistdata(list);
      modalRef.componentInstance.id = list.emailTemplateId;
    }

  }

  deleteEmailtemp(emailTemplateId) {
    const modelRef = this.modal.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.sandbox.emailTemplateDelete({ emailTemplateId: emailTemplateId });
        this.regSubscribeEvents();
      }
    });
  }


  // Delete After subscribe the Result
  regSubscribeEvents() {
    this.sandbox.emailTempDelete$.subscribe(_delete => {
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
