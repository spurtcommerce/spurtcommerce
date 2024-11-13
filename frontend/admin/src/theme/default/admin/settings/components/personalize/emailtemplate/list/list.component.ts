/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailTempSandbox } from '../../../../../../../../core/admin/settings/localizations/emailtemplate/emailtemp.sandbox';
import { EmailTempService } from '../../../../../../../../core/admin/settings/localizations/emailtemplate/emailtemp.service';
import { EmailTempAddComponent } from '../add/add.component';
import { DeleteConfirmationDialogComponent } from '../../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { Title } from '@angular/platform-browser';
import { badgeStatusMappings, customTable, removeEmptyKeys } from './list-constant';
import { Subscription } from 'rxjs';


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
export class EmailTempListComponent implements OnInit,OnDestroy {

  //dynamicColumnFields
  dynamicColumnFields: any = structuredClone(customTable);

  //badge Mappings
  badgeStatusMappings = badgeStatusMappings;
  public popoverContent: any;
  
  limit: number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;
  public index = 0;
  private keyword = '';
   private offset: any = 0;
  private paginationCount = true;
  public currentPage: number = 1;
  listCount: any;
  private subscriptions: Subscription = new Subscription();
  constructor(
    public modal: NgbModal,
    private router: Router,
    public sandbox: EmailTempSandbox,
    public service: EmailTempService,
    public titleService: Title,
    public route: ActivatedRoute,
    private ref: ChangeDetectorRef
  ) {
    this.titleService.setTitle('Settings | Personalize');
    this.regSubscribeEvents();
  }

  ngOnInit() {

    this.routeSubscribe();
  }

  /*Table Actions*/
  buttonAction(e: any): void {
    switch (e.key) {
      case "threeDotMenu":
        if (e.actionType == "Delete") {
          this.deleteEmailtemp(e?.vendorOrderId)
        } else if (e.actionType == "Edit") {
          this.editEmailtemp(e)
        }
        break;
    }
  }


  /**
   * Handles form 'list' event. Calls sandbox EmailTemp list function .
   *
   * @param params storing entire value
   */
  getemailtempList() {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = 0;
    this.sandbox.getEmailTemplateList(params);
    this.sandbox.emailTempList$.subscribe(data => {
      if (data) {

      }
    })
    this.updateQueryParam();
  }

  getemailtempListCount() {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = 1;
    this.sandbox.emailTemplatePagination(params);
    this.sandbox.emailTempPagination$.subscribe(data => {
      if (data?.status == 1) {
        this.listCount = data.data
        this.ref.detectChanges();
      }
    });
  }
    // Value update in queryparams for pagination
    private updateQueryParam(): void {
      this.router.navigate([], { queryParams: this.getQueryParam(), queryParamsHandling: 'merge' });
    }

  // Query param route value subscribe
  private routeSubscribe(): void {
    let paramsValue: any = {};
    this.subscriptions.add(this.route.queryParams.subscribe(params => {
      paramsValue = params;
      this.limit = paramsValue.limit ? Number(paramsValue.limit) : 10;
      this.offset = paramsValue.offset ? Number(paramsValue.offset) : 0;
      this.currentPage = Number(paramsValue.offset && paramsValue.limit) ? Math.floor(paramsValue.offset / paramsValue.limit) + 1 : 1;
    }));
    this.getemailtempList();
    this.getemailtempListCount();
  }



  // Query param value and pagination
  private getQueryParam(): any {
    const params = {
      limit: this.limit,
      offset: this.offset,
    };
    return params;
  }


  // Add Email Temp navigate to Add Form
  addNewEmailTemp() {
    this.service.setemailtemplistdata('');
    this.router.navigate(['/settings/local/emailtemp/add']);
  }

  // Edit EmailTemp navigate to Add Form
  editEmailtemp(list) {

    const modalRef = this.modal.open(EmailTempAddComponent, {
      windowClass: 'add-local', keyboard: false, backdrop: 'static'
    });
    if (list) {
      this.service.setemailtemplistdata(list);
      modalRef.componentInstance.id = list.emailTemplateId;
    }

  }

  deleteEmailtemp(emailTemplateId) {
    const modelRef = this.modal.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.componentInstance.deleteMessage = 'Email Template';
    modelRef.result.then((result) => {
      if (result === 'Deleted') {
        this.sandbox.emailTemplateDelete({ emailTemplateId: emailTemplateId });
        this.regSubscribeEvents();
      }
    });
  }


  // Delete After subscribe the Result
  regSubscribeEvents() {
    this.sandbox.emailTempDelete$.subscribe(_delete => {
      if (_delete && _delete.status === 1) {
        this.getemailtempList();
      }
    });
  }


  // pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.getemailtempList();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
