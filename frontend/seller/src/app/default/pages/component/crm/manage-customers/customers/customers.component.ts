//Angular Imports
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
//Third Paarty Imports
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//Component Imports
import { ModalPopupComponent } from '../../../catalog/manage-product/modalpopup/modalpopup.component';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { CustomerGroupComponent } from '../customer-group/customer-group.component';
import { BulkUpdateComponent } from '../../../../../../../../src/app/default/common/bulk-update/bulk-update.component';
//SandBox Imports
import { crmGroupsSandbox } from '../../../../../../../../src/app/core/crmGroups/crmGroups.sandbox';
//Service Imports
import { crmGroupsService } from '../../../../../../../../src/app/core/crmGroups/crmGroups.service';
//Constant Imports
import { bulkActions, customTable, fields, objForm, removeEmptyKeys } from './customer.constant';
import { getFormControlsFieldsObj } from '../../../../../../../../src/app/default/shared/components/reusable-forms/form-constant';
import { getTypes } from '../../../../../../../../src/app/default/shared/components/reusable-forms/form-constant';
import { itemsPerPageList } from '../../../../../../../../src/app/default/shared/components/reusable-pagination/pagination.constant';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  @ViewChild('dropdownContent', { static: false }) dropdownContent: ElementRef;
  @ViewChild('dropdownContentFilter', { static: false }) dropdownContentFilter: ElementRef;

  //Dynamic columns Table
  public backupData: any = structuredClone(customTable);
  public dynamicColumnFields: any = structuredClone(customTable);

  // Pagination
  public currentPage: any = 1;
  public limit: any = 10;
  public offset: any = 0;
  pageSizeList = itemsPerPageList;

  // filters dynamic columns
  backupColumns = structuredClone(fields);

  // Common
  _Object = Object;
  empty = [null, '', undefined];

  // Subscriptions
  private subscriptions: Array<Subscription> = [];

  // API count and list
  listData: any = [];
  countArray: any = [];

  //browser title
  title = 'Customer Group';

  // check box
  selectedcheckbox: any = []
  tableCheckbox = {
    isSelectAll: false
  };
  bulkActions = bulkActions;

  // Reusable form 
  formObjFormGroup: any;
  dynamicObjControls: any = {};
  backupFormValue = {};
  formValueExists = false;

  // Arrow functions
  trackByIndex = (index: number): number => index;

  constructor(
    public router: Router,
    public formBuilder: UntypedFormBuilder,
    public toaster: ToastrService,
    public route: ActivatedRoute,
    public modal: NgbModal,
    public crmGroupsSandbox: crmGroupsSandbox,
    public fb: UntypedFormBuilder,
    private ref: ChangeDetectorRef,
    private crmGroupsService: crmGroupsService,
    public titleService: Title,
  ) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    this.buildForm();
    this.routerSubscribe();
  }

  // Router Subscribe
  routerSubscribe() {
    this.offset = parseInt(this.route.snapshot.queryParamMap.get('offset')) || this.offset;
    this.limit = parseInt(this.route.snapshot.queryParamMap.get('limit')) || this.limit;
    this.currentPage = this.route.snapshot.queryParamMap.get('pageSize') || this.currentPage;
    this.subscriptions.push(this.route.queryParams.subscribe(params => {
      this.formObjFormGroup.patchValue({
        'groupName': params.groupName ?? "",
        'Status': params.status ?? null,
        'Search': params.keyword ?? ""
      });
      this.filterValueUpdate();
    }))
    this.customerList();
    this.customerListCount();
  }

  //Button Action
  buttonAction(event: any): void {
    switch (event.key) {
      case "checkBox":
        this.selectedcheckbox = event.selectedDatas;
        break;
      case "toggle":
        this.statusUpdate(event, event.radioEvent);
        break;
      case "threeDotMenu":
        if (event.actionType == 'Edit') {
          this.editCustomerGroup(event);
        } else {
          this.deleteData(event?.id);
        }
        break;
    }
  }

  //Check Box Action
  actionType(type: string): void {
    switch (type) {
      case 'resetCheckbox':
        this.resetCheckbox();
        break;
      case 'bulkUpload':
        this.BulkUpdate()
        break;
    }
  }

  removeFilter(remove): void {
    this.formObjFormGroup.controls[remove.key].reset();
    this.filterValueUpdate();
    this.resetAll();
  }

  // Form Value
  private buildForm(): void {
    const formObjModel = structuredClone(objForm);
    const formGroupField = getFormControlsFieldsObj(formObjModel);
    this.formObjFormGroup = this.fb.group(formGroupField);
    Object.keys(formObjModel).forEach((element: any) => {
      this.dynamicObjControls[element] = getTypes(formObjModel[element], this.formObjFormGroup);
    });
    this.filterValueUpdate();
  }

  // Save columns
  saveColumns(data: any): void {
    this.backupColumns = structuredClone(data);
    this.showHideTableColumn();
  }

  // apply filter
  applyFilter(): void {
    this.filterValueUpdate();
    this.resetAll();
  }

  // reset filter
  filterReset(type: string): void {
    if (type == 'clearAll') {
      this.formObjFormGroup.reset()
    } else {
      this.formObjFormGroup.patchValue({
        'groupName': '',
        'Status': null,
        'Search': ''
      });
    }
    this.filterValueUpdate();
    this.resetAll();
  }

  // Add Group Button
  addCustomerGroup(): void {
    const modelRef = this.modal.open(CustomerGroupComponent, {
      size: 'md', backdrop: 'static', backdropClass: 'createcr', centered: true, windowClass: "assignattributesmodal-categories",
    });

    modelRef?.result.then((result) => {
      if (result == 'close') {
        this.customerList();
        this.customerListCount();
      }
    })
  }
  // customer list
  customerList(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    let param = removeEmptyKeys(this.getQueryParam());
    param.count = 0;
    delete param['currentPage']
    this.crmGroupsSandbox.customerGroupList(param);
    this.subscriptions.push(this.crmGroupsSandbox.customerGroupList$.subscribe(val => {
      this.listData = val
      val.forEach(res => {
        if (res.checked) {
          this.selectedcheckbox.push(res.id)
        }
      })
    }))
    this.updateQueryParam();
  }

  // customer Count
  customerListCount(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    let param = removeEmptyKeys(this.getQueryParam());
    param.count = 1;
    delete param['currentPage']
    this.crmGroupsSandbox.customerGroupListCount(param);
    this.subscriptions.push(this.crmGroupsSandbox.customerGroupListCount$.subscribe(val => {
      if (val) {
        this.countArray = val;
      }
    }));
    this.updateQueryParam();
  }

  //page change event pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.customerList();
  }

  //per page drop down
  pageSizeChange(e): void {
    this.onPageChange({ limit: e.id, offset: 0 });
  }

  //delete
  deleteData(id: any): void {
    const modelRef = this.modal.open(ModalPopupComponent, {
      size: 'md', backdrop: 'static', backdropClass: 'createcr', centered: true, windowClass: "assignattributesmodal-categories delete-modal",
    })
    modelRef.componentInstance.deleteMessage = "Customer Group"
    modelRef.result.then(result => {
      if (result == "deleted") {
        this.crmGroupsSandbox.deleteCustomerGroup(id)
     this.subscriptions.push(this.crmGroupsSandbox.deleteCustomerGroup$.subscribe(val => {
          if (val?.status == 1) {
            if (this.listData.length == 1) {
              this.offset = 0;
              this.currentPage = 1;
            }
            this.customerList();
            this.customerListCount();
          }
        }))
      }
    })
  }

  //edit
  editCustomerGroup(data: any) {
    const modelRef = this.modal.open(CustomerGroupComponent, {
      size: 'md', backdrop: 'static', backdropClass: 'createcr', centered: true, windowClass: "assignattributesmodal-categories",
    });
    modelRef.componentInstance.groupId = data.id;
    modelRef?.result.then((result) => {
      if (result == 'close') {
        this.customerList();
        this.customerListCount();
      }
    })
  }

  // query param value and pagination //
  getQueryParam(): any {
    const params = {
      limit: this.limit,
      offset: this.offset,
      currentPage: this.currentPage,
      keyword: this.backupFormValue['Search'] ?? '',
      groupName: this.backupFormValue['groupName'] ?? '',
      status: this.backupFormValue['Status'] ?? null
    };
    return params;
  }

  addCustomer(data: any, id: any) {
    const modelRef = this.modal.open(AddCustomerComponent, {
      size: 'md', backdrop: 'static', backdropClass: 'createcr', centered: true, windowClass: "permisson-modal",
    });
    modelRef.componentInstance.id = id
    if (data.isMapped == 1) {
      modelRef.componentInstance.detailsId = id
    }
    modelRef.result.then((result) => {
      if (result == 'close') {
        this.customerList();
        this.customerListCount();
      }
    })
  }

  statusUpdate(data: any, event): void {
    const params = {
      status: event ? 1 : 0,
      id: data.id
    };
    this.crmGroupsSandbox.customerStatusUpdate(params);
  }

  closebutton() {
   this.subscriptions.push(this.crmGroupsSandbox.customerGroupList$.subscribe(val => {
      val.forEach((res) => (
        res.checked = false
      ));
    }));
    this.selectedcheckbox = []
  }

  //Bulk update Status 
  BulkUpdate() {
    const modelRef = this.modal.open(BulkUpdateComponent, {
      size: 'md', backdrop: 'static', backdropClass: 'createcr', centered: true, windowClass: "assignattributesmodal-categories",
    });
    modelRef.componentInstance.Name = 'BulkUpdate.CustomerGroupStatus';
    modelRef.componentInstance.Content = 'BulkUpdate.SelectAndActivateMultiple';
    modelRef.componentInstance.action = 'Single';
    modelRef.result.then((result) => {
      if (result?.modelStatus == 'Save') {
        this.selectedcheckbox = this.selectedcheckbox.map(res => res.id);
        const params = {
          customerGroupIds: this.selectedcheckbox,
          statusId: result?.StatusChange == 1 ? 1 : 0
        }
        this.crmGroupsService.bulkStatusUpdate(params).subscribe((res: any) => {
          if (res?.status == 1) {
            this.resetCheckbox();
            this.customerList();
            this.selectedcheckbox = [];
          }
        })
      }
    })
  }

  // value update in queryparams and pagination//
  private updateQueryParam(): void {
    this.router.navigate([], { queryParams: this.getQueryParam(), queryParamsHandling: 'merge' });
  }

  // filterclose
  private dropDownClose(dropDownName): void {
    if (this.hasOwnProperty(dropDownName)) {
      this[dropDownName]?.close();
    }
  }

  //Show hide table column
  private showHideTableColumn(): void {
    this.dynamicColumnFields.forEach(val => {
      if (val.hasOwnProperty('filterColName')) {
        val.checked = this.backupColumns[val.filterColName];
      }
    })
  }

  //Reset All
  private resetAll(): void {
    this.customerList();
    this.customerListCount();
    this.dropDownClose('dropdownContentFilter');
    this.dropDownClose('dropdownContent');
  }

  //Filter Value Update
  private filterValueUpdate(): void {
    this.backupFormValue = structuredClone(this.formObjFormGroup?.value);
    this.formValueExists = Object.values(structuredClone(this.backupFormValue)).some((val: any) => !this.empty.includes(val));
    this.ref.detectChanges();
  }

  // Reset check box
  private resetCheckbox(): void {
    this.reset();
    this.tableCheckbox.isSelectAll = false;
    this.tableCheckbox = { ...this.tableCheckbox };
  }

  private reset(isChecked = false) {
    this.listData.forEach(val => val.checked = isChecked);
    this.selectedcheckbox = this.listData.filter(val => val?.checked);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
  }
}