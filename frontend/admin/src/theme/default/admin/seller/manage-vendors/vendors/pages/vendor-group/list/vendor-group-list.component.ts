/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// Angular Imports
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';

// Third Party Imports
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

// Store Action 
import { VendorGroupSandbox } from '../../../../../../../../../../src/core/admin/vendor/pages/vendor-group/vendor-group.sandbox';

// Shared Components
import { DeleteConfirmationDialogComponent } from '../../../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';

// Constant
import { badgeStatusMappings, bulkAction, customTable, filterFields, removeEmptyKeys } from './vendor-group-list.constant';
import { getFormControlsFields, getTypes } from '../../../../../../../../../../src/theme/default/admin/shared/components/common-form/common-form.constant';
import { VendorGroupService } from 'src/core/admin/vendor/pages/vendor-group/vendor-group.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-vendor-group-list',
  templateUrl: 'vendor-group-list.component.html',
  styleUrls: ['vendor-group-list.component.scss']
})
export class vendorGroupListComponent implements OnInit {

  @ViewChild("myDropdown") myDropdown!: NgbDropdown;
  @ViewChild('myInput') myInput: ElementRef;

  // Reusable form 
  dynamicObjControls: any = {};
  backupFormValue: any = {};
  private formObjFormGroup: any;
  private formValueExists = false;

  // Status Badge
  badgeStatusMappings = badgeStatusMappings;

  // Common
  _Object = Object;
  empty = [null, '', undefined];

  //Dynamic columns
  customTable: any = customTable;

  // list 
  private queryData: any = {};
  private title = 'Seller Group';
  public groupList: any = []

  // pagination
  currentPage: number = 1;
  private offset: any = 0;
  limit: any = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;

  // subscriptions
  private subscriptions: Subscription = new Subscription();


  // Status Badge
  bulkAction = bulkAction;

  // Arrow functions
  trackByIndex = (index: number): number => index;

  focusInput() {
    this.myInput.nativeElement.focus();
  }

  constructor(
    public vendorGroupSandbox: VendorGroupSandbox,
    public fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public modalService: NgbModal,
    public titleService: Title,
    public VendorGroupService: VendorGroupService
  ) {
  }

  // check box
  selectedDatas: any = [];
  tableCheckbox = {
    isSelectAll: false
  };

  ngOnInit() {
    this.titleService.setTitle(this.title);
    // form
    this.buildForm();
    /*query param route value*/
    this.routeSubscribe();
    this.vendorGroupSandbox.vendorGroupCount({});
  }

  //  button Action
  buttonAction(e: any): void {
    switch (e.key) {
      case "threeDotMenu":
        if (e.actionType == 'Edit') {
          this.update(e);
        } else {
          this.deleteSeller(e)
        }
        break;
      case "checkBox":
        this.selectedDatas = e.selectedDatas;
        break;
    }
  }

  // Bulk actions
  actionType(type: string): void {
    switch (type) {
      case 'resetCheckbox':
        this.resetCheckbox();
        break;
      case 'exportExcel':
        this.exportExcel()
        break;
      case 'exportExcelAll':
        this.exportAllExcel()
        break;
      case 'delete':
        this.bulkDelete()
        break;
    }
  }

  // Reset checkbox
  private reset(isChecked = false) {
    this.groupList.forEach(val => val.checked = isChecked);
    this.selectedDatas = this.groupList.filter(val => val?.checked);
  }

  // Reset check box
  private resetCheckbox(): void {
    this.reset();
    this.tableCheckbox.isSelectAll = false;
    this.tableCheckbox = { ...this.tableCheckbox };
  }

  // Export Seller Excel 
  exportExcel(): void {
    const param: any = {};
    param.sellerGroupIds = this.selectedDatas.map(list => list?.groupId).toString();
    // this.sellerSandbox.sellerExcel(param);
    this.subscriptions.add(this.VendorGroupService.vendorGroupExport(param).subscribe(val => {
      const filename = 'Seller_List' + Date.now() + '.xlsx';
      const blob = new Blob([val], { type: 'text/xlsx' });
      saveAs(blob, filename);
    }));
  }

  exportAllExcel(): void {
    const param: any = {};
    param.sellerGroupIds = '';
    this.subscriptions.add(this.VendorGroupService.vendorGroupExport(param).subscribe(val => {
      const filename = 'Seller_List' + Date.now() + '.xlsx';
      const blob = new Blob([val], { type: 'text/xlsx' });
      saveAs(blob, filename);
    }));
    // this.sellerSandbox.sellerExcel(param);
  }


  bulkDelete(): void {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: "sm",
      windowClass: "delete-confirm",
      backdrop: "static",
      modalDialogClass: "modal-dialog-centered",
      backdropClass: "createcr",
    });
    modelRef.componentInstance.key = "Seller groups";
    modelRef.componentInstance.id = "";
    modelRef.result.then((result) => {
      if (result === "deleted") {
        const param: any = {};
        param.vendorId = this.selectedDatas.map(list => list?.vendorId).toString();


      }
    });
  }

  // Dropdown Close
  private dropDownClose(dropDownName): void {
    if (this.hasOwnProperty(dropDownName)) {
      this[dropDownName]?.close();
    }
  }

  // Reset All
  private resetAll(): void {
    this.onPageChange({ limit: this.limit, offset: 0 });
    this.vendorGroupList();
    this.vendorGroupListCount();
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
        'Group Name': "",
        'status': "",
        'search': "",
      });
    }
    this.filterValueUpdate();
    this.resetAll();
  }

  // list
  vendorGroupList(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    const param = removeEmptyKeys(this.getQueryParam());
    param.count = 0;
    this.vendorGroupSandbox.vendorGroupList(param);
    this.vendorGroupSandbox.vendorGroup$.subscribe((val) => {
      this.groupList = val
    })
    // this.groupList
    this.updateQueryParam();
  }

  // Count
  vendorGroupListCount(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = 1;
    this.vendorGroupSandbox.vendorGroupListCount(params);
  }

  // pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.vendorGroupList();
  }

  // add seller group
  addSellerGroup() {
    this.router.navigate(['/seller/manage-seller/seller/seller-group/add'], { queryParams: this.getQueryParam() });
  }

  // edit seller group 
  update(data): void {
    const id = data.groupId;
    this.router.navigate(['/seller/manage-seller/seller/seller-group/edit', id], { queryParams: this.getQueryParam() });
  }

  // delete seller group
  deleteSeller(id): void {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.componentInstance.deleteMessage = 'Vendor Group'
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        const params: any = {};
        params.groupId = id.groupId;
        this.vendorGroupSandbox.vendorGroupDelete(params);
        this.vendorGroupSandbox.vendorGroupDelete$.subscribe(val => {
          if (val?.status === 1) {
            this.vendorGroupList();
            this.vendorGroupListCount();
          }
        })

      }
    });
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
      groupName: this.backupFormValue['Group Name'] ?? '',
      status: this.backupFormValue['status'] ? this.backupFormValue['status'] : '',
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
      this.currentPage = (paramsValue.offset && paramsValue.limit) ? Math.floor(paramsValue.offset / paramsValue.limit) + 1 : 1;
      this.formObjFormGroup.patchValue({
        'Group Name': paramsValue.groupName ?? "",
        'status': paramsValue.status ? paramsValue.status : null,
        'search': paramsValue.keyword ?? "",
      });
      this.filterValueUpdate();
    }));
    this.vendorGroupList();
    this.vendorGroupListCount();
  }
}
