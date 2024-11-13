//Angular Imports
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//Third Party imports
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
//SandBox Imports
import { CustomerSandbox } from '../../../../../../../../src/app/core/customers/customers.sandbox';
//Service Imports
import { CustomerService } from '../../../../../../../../src/app/core/customers/customers.service';
//Component Imports
import { BulkUpdateComponent } from '../../../../../../../../src/app/default/common/bulk-update/bulk-update.component';
//Constant Imports
import { customTable, fields, objForm, removeEmptyKeys, bulkActions, contentTranslate } from './list.constant';
import { getTypes } from '../../../../../../../../src/app/default/shared/components/reusable-forms/form-constant';
import { getImageUrlNew } from '../../../../../../../../src/app/default/shared/components/common-table/common-table.constant';
import { getFormControlsFieldsObj } from '../../../../../../../../src/app/default/shared/components/reusable-forms/form-constant';
import { itemsPerPageList, itemsPerPage } from '../../../../../../../../src/app/default/shared/components/reusable-pagination/pagination.constant';

//Environment Imports
import { environment } from '../../../../../../../../src/environments/environment';
import { configureAlertConfig } from '../../../../../../../../src/app/default/shared/components/alert-content/alert.content.constant';
import { imagesList } from '../../../../../../../../src/app/default/shared/components/alert-content/alert.content.constant';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild("dropdownContent", { static: false }) dropdownContent!: ElementRef;
  @ViewChild("dropdownContentFilter", { static: false }) dropdownContentFilter!: ElementRef;

  // Image url
  imageUrl = environment.imageUrl;
  //Dynamic columns Table
  backupData: any = structuredClone(customTable);
  dynamicColumnFields: any = structuredClone(customTable);

  // Pagination
  countArray: any;
  currentPage = 1;
  limit: any = itemsPerPage;
  offset = 0;
  pageSizeList = itemsPerPageList;
  queryData: any = {};

  // List
  listData: any[] = [];

  // check box
  selectedcheckbox: any = [];
  selectedData: any = []
  tableCheckbox = {
    isSelectAll: false
  };
  bulkActions = bulkActions;

  // filters dynamic columns
  backupColumns = structuredClone(fields);

  // Common
  _Object = Object;
  empty = [null, '', undefined];

  // Alerts
  alertConfig = {};

  // Reusable form 
  formObjFormGroup: any;
  dynamicObjControls: any = {};
  backupFormValue = {};
  formValueExists = false;

  // Arrow functions
  trackByIndex = (index: number): number => index;
  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  constructor(public router: Router,
    public formBuilder: UntypedFormBuilder,
    public toaster: ToastrService,
    public route: ActivatedRoute,
    public modal: NgbModal,
    public customerSandbox: CustomerSandbox,
    public fb: UntypedFormBuilder,
    private ref: ChangeDetectorRef,
    private CustomerService: CustomerService,
    public titleService: Title
  ) {
    this.titleService.setTitle('Customer');
  }

  ngOnInit(): void {
    // Form
    this.buildForm();
    // Query param route value
    this.routeSubscribe();
  }

  // Save columns
  saveColumns(data: any): void {
    this.backupColumns = structuredClone(data);
    this.showHideTableColumn();
  }

  // Page change event pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.getPurchase();
  }

  // Per page change drop down
  pageSizeChange(e): void {
    this.onPageChange({ limit: e.id, offset: 0 });
  }

  /*common table*/
  buttonAction(e: any): void {
    switch (e.key) {
      case "checkBox":
        this.selectedData = e.selectedDatas;
        this.selectedcheckbox = e.selectedDatas.map(val => val?.customerId);
    }
  }

  // Bulk actions
  actionType(type: string): void {
    switch (type) {
      case 'resetCheckbox':
        this.resetCheckbox();
        break;
      case 'exportExcel':
        this.EportdataAll('')
        break
      case 'exportExcelAll':
        this.EportdataAll('all')
        break
      case 'bulkUpload':
        this.BulkUpdate();
        break
    }
  }

  // Navigation Customer Detail
  customerDetail(data, type): void {
    data.show = type;
    data.limit = this.limit;
    data.offset = this.offset;
    data.currentPage = this.currentPage;
    this.router.navigate(['/crm/customer/detail/' + data.customerId], { queryParams: data })
  }

  // Filters
  buildForm(): void {
    const formObjModel = structuredClone(objForm);
    const formGroupField = getFormControlsFieldsObj(formObjModel);
    this.formObjFormGroup = this.fb.group(formGroupField);
    Object.keys(formObjModel).forEach((element: any) => {
      this.dynamicObjControls[element] = getTypes(formObjModel[element], this.formObjFormGroup);
    });
    this.filterValueUpdate();
  }

  // Apply filters
  applyFilter(): void {
    this.offset = 0;
    this.currentPage = 1;
    this.filterValueUpdate();
    this.resetAll();
  }

  // Remove Individual filter
  removeFilter(remove): void {
    this.offset = 0;
    this.currentPage = 1;
    this.formObjFormGroup.controls[remove.key].reset();
    this.filterValueUpdate();
    this.resetAll();
  }

  // Reset filters
  filterReset(type: string): void {
    this.offset = 0;
    this.currentPage = 1;
    if (type == 'clearAll') {
      this.formObjFormGroup.reset();
    } else {
      this.formObjFormGroup.patchValue({
        'customerName': '',
        'groupName': '',
        'status': null
      });
    }
    this.filterValueUpdate();
    this.resetAll();
  }

  //Export Function
  private EportdataAll(key) {
    const params: any = {};
    params.customerId = key == 'all' ? '' : this.selectedcheckbox.toString();
    this.customerSandbox.exportCustomer(params)
    this.resetCheckbox()
  }

  // Get Purchase api
  private getPurchase(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    let param = removeEmptyKeys(this.getQueryParam());
    param.count = 0;
    delete param['currentPage']
    this.customerSandbox.purchasedCustomerList(param);
    this.subscriptions.add(this.customerSandbox.purchasedCustomerList$.subscribe(val => {
      if (val) {
        val?.forEach(element => {
          if (element) {
            element.customerName = element.firstName + " " + element.lastName
            element.address = element.shippingAddress1 + "," + element.shippingAddress2
            element.checked = false
            if (["", undefined, null].includes(element.image)) {
              element.images = "assets/imgs/Load-icon-Products.png";

            } else {
              element.images = getImageUrlNew(
                this.imageUrl,
                element.containerName,
                element.image,
              );
              this.ref.detectChanges();
            }
          }
        })
      }
      this.alertConfig = configureAlertConfig(contentTranslate.success, imagesList.success)
      this.listData = val;
    }))
    this.updateQueryParam();
  }

  private getPurchaseCount(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    let param = removeEmptyKeys(this.getQueryParam());
    param.count = 1;
    delete param['currentPage']
    delete param['limit']
    delete param['offset']
    this.customerSandbox.purchaseCount(param);
   this.subscriptions.add(this.customerSandbox.purchaseCount$.subscribe(val => {
      if (val) {
        this.countArray = val;
      }
    }));
  }
  // Query param route value subscribe //
  private routeSubscribe(): void {
    let paramsValue: any = {};
    this.route.queryParams.subscribe(params => {
      paramsValue = params;
      this.limit = paramsValue.limit ? Number(paramsValue.limit) : this.limit;
      this.offset = paramsValue.offset ? Number(paramsValue.offset) : 0;
      this.currentPage = paramsValue.currentPage ? Number(paramsValue.currentPage) : 1;
      this.formObjFormGroup.patchValue({
        'customerName': paramsValue.customerName ?? "",
        'groupName': paramsValue.customerGroupName ?? "",
        'Search': paramsValue.keyword ?? '',
        'status': paramsValue.status ?? null
      });
    });
    this.filterValueUpdate()
    this.getPurchase();
    this.getPurchaseCount();
  }

  // value update in queryparams and pagination//
  private updateQueryParam(): void {
    this.router.navigate([], { queryParams: this.getQueryParam(), queryParamsHandling: 'merge' });
  }

  //Bulk update Status 
  private BulkUpdate(): void {
    const modelRef = this.modal.open(BulkUpdateComponent, {
      size: 'md', backdrop: 'static', backdropClass: 'createcr', centered: true, windowClass: "assignattributesmodal-categories",
    });
    modelRef.componentInstance.Name = 'BulkUpdate.CustomerStatus';
    modelRef.componentInstance.Content = 'BulkUpdate.SelectMultipleCustomer';
    modelRef.componentInstance.action = 'Single';
    modelRef.result.then((result) => {
      if (result?.modelStatus == 'Save') {
        const params = {
          customerIds: this.selectedcheckbox,
          statusId: result?.StatusChange == 1 ? 1 : 0
        }
        this.CustomerService.bulkStatusUpdate(params).subscribe((res: any) => {
          if (res?.status == 1) {
            this.getPurchase();
            this.resetCheckbox();
          }
        })
      }
    })
  }

  // Reset check box
  private resetCheckbox(): void {
    this.tableCheckbox.isSelectAll = false;
    this.tableCheckbox = { ...this.tableCheckbox };
    this.reset();
  }

  // Reset checkbox
  private reset(isChecked = false) {
    this.selectedcheckbox = []
    this.listData.forEach(val => val.checked = isChecked);
    this.selectedData = this.listData.filter(val => val?.checked);
  }

  //Filter Value Update
  private filterValueUpdate(): void {
    this.backupFormValue = structuredClone(this.formObjFormGroup?.value);
    this.formValueExists = Object.values(this.backupFormValue).some((val: any) => !this.empty.includes(val));
    this.ref.detectChanges();
  }

  // filterclose
  private dropDownClose(dropDownName): void {
    if (this.hasOwnProperty(dropDownName)) {
      this[dropDownName]?.close();
    }
  }

  // query param value and pagination //
  private getQueryParam() {
    const params = {
      limit: this.limit,
      offset: this.offset,
      currentPage: this.currentPage,
      keyword: this.formObjFormGroup.value?.Search ?? '',
      customerGroupName: this.formObjFormGroup.value?.groupName,
      customerName: this.formObjFormGroup.value?.customerName,
      status: this.formObjFormGroup.value?.Status
    };
    return params;
  }

  //Reset All
  private resetAll(): void {
    this.getPurchase();
    this.getPurchaseCount();
    this.dropDownClose('dropdownContentFilter');
    this.dropDownClose('dropdownContent');
  }

  //Show hide table column
  private showHideTableColumn(): void {
    this.dynamicColumnFields.forEach(val => {
      if (val.hasOwnProperty('filterColName')) {
        val.checked = this.backupColumns[val.filterColName];
      }
    })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

}
