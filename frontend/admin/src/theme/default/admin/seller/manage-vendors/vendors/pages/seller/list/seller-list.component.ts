/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
 * Author Spurt Commerce E-solutions Private Limited <mailto:support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

// Angular 
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UntypedFormBuilder } from "@angular/forms";
import { Title } from "@angular/platform-browser";

// Third Party 
import { NgbDropdown, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";

// shared Components
import { DeleteConfirmationDialogComponent } from "../../../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component";

// Sandbox
import { SellerSandbox } from "../../../../../../../../../core/admin/vendor/pages/seller/seller.sandbox";

// Service
import { ConfigService } from "../../../../../../../../../../src/core/admin/service/config.service";

// Component
import { SellerdetailsComponent } from "../sellerdetails/sellerdetails.component";

// constant
import { badgeStatusMappings, bulkAction, customTable, filterFields, removeEmptyKeys } from "./seller-list.constant";
import { getImageUrl } from "../../../../../../../../../../src/theme/default/admin/shared/components/common-table/common-table/common.constant";
import { getFormControlsFields, getTypes } from "src/theme/default/admin/shared/components/common-form/common-form.constant";

@Component({
  selector: "app-seller-list",
  templateUrl: "seller-list.component.html",
  styleUrls: ["seller-list.component.scss"],
})
export class SellerListComponent implements OnInit, OnDestroy {

  // drop down close 
  @ViewChild("myDropdown") myDropdown!: NgbDropdown;
  @ViewChild('myInput') myInput: ElementRef;

  // list
  public sellerArray: any = [];
  public imageUrl: any;

  // pagination
  public currentPage: number = 1;
  private offset: any = 0;
  private limit: any = sessionStorage.getItem("itemsPerPage") ?? '';

  // Reusable form 
  dynamicObjControls: any = {};
  backupFormValue: any = {};
  private formObjFormGroup: any;
  private formValueExists = false;

  // Status Badge
  badgeStatusMappings = badgeStatusMappings;
  bulkAction = bulkAction;

  // Query Param
  private queryData: any = {};
  private title = "Seller";

  // check box
  selectedDatas: any = [];
  tableCheckbox = {
    isSelectAll: false
  };

  // Common
  _Object = Object;
  empty = [null, '', undefined];

  //Dynamic columns
  customTable: any = customTable;

  // subscriptions
  private subscriptions = new Subscription();



  // Arrow function
  trackByIndex = (index: number): number => index;

  constructor(
    public sellerSandbox: SellerSandbox,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public modalService: NgbModal,
    private titleService: Title,
    private configService: ConfigService,
    private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.imageUrl = this.configService.getImageUrl();
    this.titleService.setTitle(this.title);
    // form
    this.buildForm();
    /*query param route value*/
    this.routeSubscribe();
  }

  // list
  sellerList(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    const param = removeEmptyKeys(this.getQueryParam());
    param.count = 0;
    this.sellerSandbox.sellerList(param);
    this.subscribeVal();
    this.updateQueryParam();
  }


  // Seller Details: 
  sellerdetails(item): void {
    const id = item.vendorId;
    this.router.navigate(["/seller/manage-seller/seller/seller/view-detail", id], {
      queryParams: this.getQueryParam(),
    });
  }

  // Count
  sellerListCount(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = 1;
    this.sellerSandbox.sellerListCount(params);
  }

  // pagination 
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.sellerList();
  }

  // route to add seller page
  addVendor(): void {
    this.router.navigate(["/seller/manage-seller/seller/seller/add"], {
      queryParams: this.getQueryParam(),
    });
  }

  // route to update seller page
  update(array): void {
    const id = array.vendorId;
    this.router.navigate(["/seller/manage-seller/seller/seller/edit", id], {
      queryParams: this.getQueryParam(),
    });
  }

  // route to detail page
  view(array): void {
    const id = array;
    this.router.navigate(["/seller/manage-seller/seller/seller/view", id], {
      queryParams: this.queryData,
    });
  }

  // route to product list of seller 
  getProductList(array): void {
    const id = array.vendorId;
    this.router.navigate(["/vendors/manage-products/seller-products"], {
      queryParams: { id: id },
    });
  }

  focusInput(): void {
    this.myInput.nativeElement.focus();
  }

  // Delete Seller
  deleteSeller(data, key): void {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: "sm",
      windowClass: "delete-confirm",
      backdrop: "static",
      modalDialogClass: "modal-dialog-centered",
      backdropClass: "createcr",
    });
    modelRef.componentInstance.key = key;
    modelRef.componentInstance.id = data.vendorId;
    modelRef.componentInstance.deleteMessage = "Seller";
    modelRef.result.then((result) => {
      if (result === "deleted") {
        const param: any = {
          vendorId: data.vendorId
        }
        this.sellerSandbox.deleteSeller(param);
        this.subscriptions.add(this.sellerSandbox.getdeleteseller$.subscribe((_delete) => {
          if (_delete) {
            this.sellerList();
            this.sellerListCount();
          }
        }));
      }
    });
  }

  bulkDelete(): void {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: "sm",
      windowClass: "delete-confirm",
      backdrop: "static",
      modalDialogClass: "modal-dialog-centered",
      backdropClass: "createcr",
    });
    modelRef.componentInstance.key = "";
    modelRef.componentInstance.id = "";
    modelRef.result.then((result) => {
      if (result === "deleted") {
        const param: any = {};
        param.vendorId = this.selectedDatas.map(list => list?.vendorId).toString();
        this.sellerSandbox.bulkDelete(param);
        this.subscriptions.add(this.sellerSandbox.deletesLoaded$.subscribe((_delete) => {
          if (_delete) {
            this.sellerList();
            this.sellerListCount();
          }
        }));
      }
    });
  }

  buttonAction(e: any): void {
    switch (e.key) {
      case "checkBox":
        this.selectedDatas = e.selectedDatas;
        break;
      case "threeDotMenu":
        if (e.actionType == 'Edit') {
          this.update(e);
        }
        if (e.actionType == 'Set-Commission'){
          this.setCommission(e);
        }
        if (e.actionType == 'Delete') {
          this.deleteSeller(e, 'Seller')
        }
        break;
    }
  }

  // Set Commission
  setCommission(array){
    const id = array.vendorId;
    this.router.navigate(["seller/manage-seller/seller/seller/set-commission", id], {
      queryParams: { id: id },
    });
  }

  // Reset checkbox
  private reset(isChecked = false) {
    this.sellerArray.forEach(val => val.checked = isChecked);
    this.selectedDatas = this.sellerArray.filter(val => val?.checked);
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

  // Reset All
  private resetAll(): void {
    this.onPageChange({ limit: this.limit, offset: 0 });
    this.sellerListCount();
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
        'Company Name': "",
        'Seller Name': "",
        'Email': "",
        'Status': "",
        'Seller Id': "",
        'search': "",
      });
    }
    this.filterValueUpdate();
    this.resetAll();
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

  // Export Seller Excel 
  exportExcel(): void {
    const param: any = {};
    param.vendorId = this.selectedDatas.map(list => list?.vendorId).toString();
    this.sellerSandbox.sellerExcel(param);
  }

  exportAllExcel(): void {
    const param: any = {};
    this.sellerSandbox.sellerExcel(param);
  }

  // approve seller
  approvalFlag(array): void {
    const params: any = {};
    params.vendorId = array.vendorId;
    params.approvalFlag = 1;
    this.sellerSandbox.sellerApproval(params);
  }

  subscribeVal(): void {
    this.subscriptions.add(this.sellerSandbox.getSellerApproval$.subscribe((val) => {
      if (val && val.status === 1) {
        this.sellerList();
      }
    }));
    this.subscriptions.add(this.sellerSandbox.getSellerList$.subscribe((data) => {
      if (data) {
        this.sellerArray = [];
        this.sellerArray = data.map((val): Array<any> => {
          val.sellerGroup = val.vendorGroup?.name;
          val.customerEmail = val.customer?.email;

          if (this.empty.includes(val.customer?.avatar)) {
            val.image = "assets/error-images/Load-icon-Products.png";
          } else {
            val.image = getImageUrl(
              this.imageUrl,
              val.customer?.avatarPath,
              val.customer?.avatar
            );
            this.ref.detectChanges();
          }
          return { ...val, selected: false };
        });
      }
    }));
  }

  opensellerdetail(id): void {
    const modelRef = this.modalService.open(SellerdetailsComponent, {
      windowClass: 'add-local seller-detail-modal', keyboard: false, backdrop: 'static', centered: false, animation: false,
    });
    modelRef.componentInstance.id = id;
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
      companyName: this.backupFormValue['Company Name'] ?? '',
      vendorName: this.backupFormValue['Seller Name'] ?? '',
      email: this.backupFormValue['Email'] ?? '',
      status: this.backupFormValue['Status'] ? this.backupFormValue['Status'] : '',
      vendorId: this.backupFormValue?.['Seller Id'] ?? '',
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
        'Company Name': paramsValue.companyName ?? "",
        'Seller Name': paramsValue.vendorName ?? "",
        'Email': paramsValue.email ?? "",
        'Status': paramsValue.status ? paramsValue.status : null,
        'Seller Id': paramsValue.vendorId ?? "",
        'search': paramsValue.keyword ?? "",
      });
      this.filterValueUpdate();
    }));
    this.sellerList();
    this.sellerListCount();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

