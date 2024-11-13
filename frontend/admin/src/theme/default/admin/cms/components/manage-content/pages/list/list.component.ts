/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

// Angular imports
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
// Third Party imports
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
// Components
import { DeleteConfirmationDialogComponent } from '../../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
// Sandbox
import { PagesSandbox } from '../../../../../../../../core/admin/cms/pages/pages.sandbox';
//service
import { PagesApiclientService } from '../../../../../../../../core/admin/cms/pages/pages.ApiclientService';
//Constants
import { getFormControlsFields, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';
import { bulkActions, customTable, filterFields, removeEmptyKeys } from './list.constant';

@Component({
  selector: 'app-spurt-cms-page-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #009efb;
        color: white;
      }

      .dark-modal .close {
        color: white;
      }

      .light-blue-backdrop {
        background-color: #5cb3fd;
      }

      .image-manager .modal-dialog {
        max-width: 70%;
      }
    `
  ]
})
export class PageListComponent implements OnInit, OnDestroy {
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild('myInput') myInput: ElementRef;

  //Dynamic columns
  customTable: any = customTable;

  // Pagination
  currentPage = 1;
  limit: number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;
  offset = 0;
  queryData: any = {};
  pagination: boolean = true;

  // List
  approvedProductList = [];

  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  // Arrow functions
  trackByIndex = (index: number): number => index;

  // Reusable form 
  formObjFormGroup: any;
  dynamicObjControls: any = {};
  backupFormValue = {};
  formValueExists = false;

  // Common
  _Object = Object;
  empty = [null, '', undefined];

  // check box
  selectedDatas: any = [];
  tableCheckbox = {
    isSelectAll: false
  };

  // Bulk Action
  bulkAction = bulkActions;

  // Seller Id
  sellerId: number | string;

  constructor(
    public titleService: Title,
    public service: PagesApiclientService,
    private router: Router,
    public route: ActivatedRoute,
    public sandbox: PagesSandbox, 
    private ref: ChangeDetectorRef,
    public modalService: NgbModal,
    public fb: UntypedFormBuilder,
    public modal: NgbModal
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Pages');

    // form
    this.buildForm();
    /*query param route value*/
    this.routeSubscribe();
  }

  /*Table Actions*/
  buttonAction(e: any): void {
    switch (e.key) {
      case "threeDotMenu":
        if (e.actionType == 'Edit') {
          this.editPageList(e);
        } else {
          this.deletePages(e.pageId);
        }
        break;
      case "checkBox":
        this.selectedDatas = e.selectedDatas;
        break;
    }
  }

  //edit
  editPageList(pagesList) {
    this.router.navigate(['/cms/manage-content/pages/edit', pagesList.pageId], { queryParams: this.queryData });
  }


  // delete
  deletePages(pageId) {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.componentInstance.deleteMessage = 'Page'
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.sandbox.deletePagesList({ pageId: pageId });
        this.sandbox.pagesDelete$.subscribe(val => {
          if(val.status == 1){
            this.productList();
            this.productCount();
            this.sandbox.getPageCount();
          }
        })
      }
    });
  }

  // Reset checkbox
  private reset(isChecked = false) {
    this.approvedProductList.forEach(val => val.checked = isChecked);
    this.selectedDatas = this.approvedProductList.filter(val => val?.checked);
  }

  // Reset check box
  private resetCheckbox(): void {
    this.reset();
    this.tableCheckbox.isSelectAll = false;
    this.tableCheckbox = { ...this.tableCheckbox };
  }

  // Dropdown Close
  private dropDownClose(dropDownName): void {
    if (this.hasOwnProperty(dropDownName)) {
      this[dropDownName]?.close();
    }
  }

  //Reset All
  private resetAll(): void {
    this.onPageChange({ limit: this.limit, offset: 0 });
    this.productCount();
    this.dropDownClose('myDropdown');
  }

  // Filters
  applyFilter(): void {
    this.filterValueUpdate();
    this.resetAll();
  }

  // intialize form
  private buildForm(): void {
    const formObjModel = filterFields;
    const formGroupField = getFormControlsFields(formObjModel);
    this.formObjFormGroup = this.fb.group(formGroupField);
    Object.keys(formObjModel).forEach((element: any) => {
      this.dynamicObjControls[element] = getTypes(formObjModel[element], this.formObjFormGroup);
    });
    this.filterValueUpdate();
  }

  /*Remove filter*/
  removeFilter(remove): void {
    this.formObjFormGroup.controls[remove.key].reset();
    this.filterValueUpdate();
    this.resetAll();
  }

  /*Reset filters*/
  filterReset(type: string): void {
    if (type == 'clearAll') {
      this.formObjFormGroup.reset()
    } else {
      this.formObjFormGroup.patchValue({
        'sellerName': '',
        'companyName': '',
        'productName': '',
        'status': '',
      });
    }
    this.filterValueUpdate();
    this.resetAll();
  }

  // Approved product list
  productList(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    let param = removeEmptyKeys(this.getQueryParam());
    param.count = 0;
    param.approvalFlag = 1;
    if(this.sellerId) {
      param.vendorId = this.sellerId
    }
    this.sandbox.getPagesList(param);
    this.subscriptions.add(this.sandbox.pagesList$.subscribe(element => {
      this.approvedProductList = element;
    }))
    this.updateQueryParam();
  }

  // Approved product list
  productCount(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = 1;
    params.approvalFlag = 1;
    if(this.sellerId) {
      params.vendorId = this.sellerId
    }
    this.sandbox.getPagePagination(params);
  }

  // Page change event pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.productList();
  }

  // Value update in queryparams for pagination
  private updateQueryParam(): void {
    this.router.navigate([], { queryParams: this.getQueryParam(), queryParamsHandling: 'merge' });
  }

  // Query param value and pagination
  private getQueryParam(): any {
    const params = {
      limit: this.limit,
      offset: this.offset,
      keyword: this.backupFormValue['search'] ?? '',
    };
    return params;
  }

  //Filter Value Update
  private filterValueUpdate(): void {
    this.backupFormValue = structuredClone(this.formObjFormGroup?.value);
    this.formValueExists = Object.values(this.backupFormValue).some((val: any) => !this.empty.includes(val));
  }

  // Query param route value subscribe
  private routeSubscribe(): void {
    let paramsValue: any = {};
    this.subscriptions.add(this.route.queryParams.subscribe(params => {
      paramsValue = params;
      this.limit = paramsValue.limit ? Number(paramsValue.limit) : this.limit;
      this.offset = paramsValue.offset ? Number(paramsValue.offset) : 0;
      this.sellerId = paramsValue?.id ? Number(paramsValue.id) : '';
      this.currentPage = (paramsValue.offset && paramsValue.limit) ? Math.floor(paramsValue.offset / paramsValue.limit) + 1 : 1;
      this.formObjFormGroup.patchValue({
        'search': paramsValue.keyword ?? ""
      });
      this.filterValueUpdate();
    }));
    this.productList();
    this.productCount();
  }
  //bulkdelete
  bulkDelete() {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        const param: any = {};
        param.pageId = this.selectedDatas.map(val => val.pageId);
        this.sandbox.bulkDelete(param);
        this.subscriptions.add(this.sandbox.pagesDelete$.subscribe(_delete => {
          if (_delete) {
            if (_delete.status === 1) {
              this.productList();
            }
          }
        }));
      }
    });
  }

  // Bulk actions
  actionType(type: string): void {
    switch (type) {
      case 'resetCheckbox':
        this.resetCheckbox();
        break;
      case 'delete':
        this.bulkDelete()
        break;
    }
  }
  //-----------------

  addPage(){
    this.router.navigate(['/cms/manage-content/pages/add']);
  }

  addLocalization() {
    this.router.navigate(['/cms/manage-content/pages/list-localization']);
  }
  focusInput() {
    this.myInput.nativeElement.focus();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
