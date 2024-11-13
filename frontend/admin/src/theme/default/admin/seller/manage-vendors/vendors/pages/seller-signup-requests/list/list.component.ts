// angular imports
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';

// Third Party
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

// Sandbox
import { SellerSignupListSandbox } from 'src/core/admin/SellerSignupRequests/Seller Signup/SellerSignupRequests.sandbox';

// Constant
import { getFormControlsFields, getTypes } from '../../../../../../../../../../src/theme/default/admin/shared/components/common-form/common-form.constant';
import { badgeMappings, bulkAction, customTable, filterFields, removeEmptyKeys } from './list.constant';
import { ActivatePopupComponent } from '../activate-popup/activate-popup.component';
import { DeleteConfirmationDialogComponent } from 'src/theme/default/admin/shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';

import { saveAs } from 'file-saver';
import { SellerSignupRequestsService } from 'src/core/admin/SellerSignupRequests/Seller Signup/SellerSignupRequests.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class SellerSignupRequestListComponent implements OnInit {

  @ViewChild("myDropdown") myDropdown!: NgbDropdown;
  @ViewChild('myInput') myInput: ElementRef;

  // Reusable form 
  dynamicObjControls: any = {};
  backupFormValue: any = {};
  private formObjFormGroup: any;
  private formValueExists = false;

  // Common
  _Object = Object;
  empty = [null, '', undefined];

  //Dynamic columns
  customTable: any = customTable;

  // list 
  setData: any = [];
  sellerSignupRequestsArray: any = [];

  // check box
  selectedDatas: any = [];
  tableCheckbox = {
    isSelectAll: false
  };

  // pagination
  currentPage: number = 1;
  private offset: any = 0;
  limit: number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;
  filterSearch: any = {};
  public keyword = '';

  // subscriptions
  private subscriptions: Subscription = new Subscription();

  // Arrow functions
  trackByIndex = (index: number): number => index;
  badgeConfig = badgeMappings;

  // Status Badge
  bulkAction = bulkAction;


  constructor(
    public titleService: Title,
    public sandbox: SellerSignupListSandbox,
    public route: ActivatedRoute,
    private router: Router,
    public fb: UntypedFormBuilder,
    private datePipe: DatePipe,
    private ref: ChangeDetectorRef,
    private modalService: NgbModal,
    public SellerSignupRequestsService: SellerSignupRequestsService
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle('Seller Signup Request');
    // form
    this.buildForm();
    /*query param route value*/
    this.routeSubscribe();
  }

  buttonAction(e: any): void {
    switch (e.key) {
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
    this.sellerSignupRequestsArray.forEach(val => val.checked = isChecked);
    this.selectedDatas = this.sellerSignupRequestsArray.filter(val => val?.checked);
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
    param.vendorId = this.selectedDatas.map(list => list?.vendorId).toString();
    param.kycStatus = 'pending';
    this.subscriptions.add(this.SellerSignupRequestsService.sellerRequest(param).subscribe(val => {
      const filename = 'Seller' + Date.now() + '.xlsx';
      const blob = new Blob([val], { type: 'text/xlsx' });
      saveAs(blob, filename);
    }));
    // this.sellerSandbox.sellerExcel(param);
  }

  exportAllExcel(): void {
    const param: any = {};
    param.vendorId = '';
    param.kycStatus = 'pending';

    this.subscriptions.add(this.SellerSignupRequestsService.sellerRequest(param).subscribe(val => {
      const filename = 'Seller' + Date.now() + '.xlsx';
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
    modelRef.componentInstance.key = "";
    modelRef.componentInstance.id = "";
    modelRef.result.then((result) => {
      if (result === "deleted") {
        const param: any = {};
        param.vendorId = this.selectedDatas.map(list => list?.vendorId).toString();
      }
    });
  }


  sellerSignupRequestsList() {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    // params.isEmailVerified = 0;
    // params.isEmailSent = 2;
    params.kycStatus = 'pending';
    params.count = 0;
    params.recievedDate = this.datePipe.transform(this.backupFormValue['Received On'], 'yyyy-MM-dd') ?? '',

      // params.status=1;
      this.sandbox.sellerSignupList(params);
    this.sandbox.sellerSignupList$.subscribe(val => {
      if (val) {
        val.forEach(element => {
          element.sellerName = element?.customer?.firstName + ' ' + element?.customer?.lastName;
          element.industrys = element?.industry?.name;
          element.emailId = element?.customer?.email;
        })
        this.sellerSignupRequestsArray = val;
      }
    })

    this.updateQueryParam();
  }

  sellerSignupRequestsListCount() {
    this.offset = (this.currentPage - 1) * this.limit;
    let params = removeEmptyKeys(this.getQueryParam());
    // params.isEmailVerified = 0;
    // params.isEmailSent = 2;
    params.kycStatus = 'pending';
    params.count = 1;
    params.recievedDate = this.datePipe.transform(this.backupFormValue['Received On'], 'yyyy-MM-dd') ?? '',
      // params.status=1;
      this.sandbox.sellerSignupListCount(params);
  }


  updateSeller(data) {
    const modelRef = this.modalService.open(ActivatePopupComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
    });
    modelRef.componentInstance.emailStatus = data;
    modelRef.result.then((result) => {
      if (result.message === "success") {
        const params: any = {}
        params.id = data.vendorId;
        params.emailStatus = 2;
        this.sandbox.updateSeller(params)
        this.sandbox.updateSeller$.subscribe(val => {
          if (val?.status == 1) {
            this.sellerSignupRequestsList();
            this.setData.push(data.vendorId);
            // this.router.navigate(['/seller/manage-seller/seller/seller-onboarding/verification'])
          }
        })
      }
    });
  }

  keywordchange(event) {
    this.filterSearch.keyword = event;
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
    this.sellerSignupRequestsListCount();
    this.sellerSignupRequestsList();
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
        'Company': "",
        'Seller Name': "",
        'Email': "",
        'Industry': "",
        'Received On': "",
        'Search': "",
      });
    }
    this.filterValueUpdate();
    this.resetAll();
  }

  // pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.sellerSignupRequestsListCount();
    this.sellerSignupRequestsList();
  }

  // when you click tab cursor will go to search 
  focusInput(): void {
    this.myInput.nativeElement.focus();
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
      vendorName: this.backupFormValue['Seller Name'] ?? '',
      email: this.backupFormValue['Email'] ?? '',
      companyName: this.backupFormValue?.['Company'] ?? '',
      industryName: this.backupFormValue?.['Industry'] ?? '',
      recievedDate: this.backupFormValue?.['Received On'] ?? ""
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
        'Seller Name': paramsValue.vendorName ?? "",
        'Company': paramsValue.companyName ?? "",
        'Industry': paramsValue.industryName ?? "",
        'Email': paramsValue.email ?? "",
        'Received On': paramsValue.recievedDate ? new Date(paramsValue.recievedDate) : "",
        'search': paramsValue.keyword ?? ""
      });
      this.formObjFormGroup.patchValue({
        'search': paramsValue.keyword ?? ""
      });
      this.filterValueUpdate();
    }));
    this.sellerSignupRequestsListCount();
    this.sellerSignupRequestsList();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
