//Angular Imports
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
//Third Party Imports
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
//Environment Import
import { environment } from '../../../../../../../../src/environments/environment';
//SandBox Import
import { CustomerSandbox } from '../../../../../../../../src/app/core/customers/customers.sandbox';
//Constant Imports
import { removeEmptyKeys } from '../list/list.constant';
import { customTable1, customTable2, objForm } from './detail.constant';
import { getFormControlsFieldsObj, getTypes } from '../../../../../../../../src/app/default/shared/components/reusable-forms/form-constant';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  @ViewChild("dropdownContent", { static: false }) dropdownContent!: ElementRef;
  @ViewChild("dropdownContentFilter", { static: false }) dropdownContentFilter!: ElementRef;
  // Image url
  public imageUrl = environment.imageUrl;

  // Tab Change
  public show = true;

  // Pagination
  public currentPage: any = 1;
  public limit: any = 10;
  public offset: any = 0;
  perPageCount: boolean = false;
  indexs: number;
  pageSize: any = 10;
  selectedpage: any = 10;
  queryData: any = {};

  // List api
  list: any;
  valueId: any;
  listProduct;
  listDetails;
  orderedList: any;

  // Translate
  translateName: any;

  // Setting Title
  title = 'Customer';

  // Dynamic columns View Product Table
  backupData1: any = structuredClone(customTable1);
  dynamicColumnFields1: any = structuredClone(customTable1);

  //Dynamic columns Order Product Table
  backupData2: any = structuredClone(customTable2);
  dynamicColumnFields2: any = structuredClone(customTable2);

  // Reusable form 
  formObjFormGroup: any;
  dynamicObjControls: any = {};
  backupFormValue = {};
  formValueExists = false;

  // Common
  _Object = Object
  empty = [null, '', undefined];

  // duplicate order
  email: any;

  // Arrow functions
  trackByIndex = (index: number): number => index;
  constructor(
    public titleService: Title,
    public customerSandbox: CustomerSandbox,
    public toastr: ToastrService,
    public translate: TranslateService,
    private route: ActivatedRoute,
    public fb: UntypedFormBuilder,
    private ref: ChangeDetectorRef
  ) {
    this.titleService.setTitle(this.title);
    this.route.params.subscribe(data => {
      this.valueId = data;
    })
    this.route.queryParamMap.subscribe((params: any) => {
      this.listDetails = params;
      this.show = JSON.parse(params.params.show);
      this.email = params.params.email;
      this.queryData.offset = params.params?.offset ? params.params?.offset :0;
      this.queryData.limit = params.params.limit ? params.params.limit : 10;
      this.queryData.currentPage = params.params.currentPage ? params.params.currentPage : 1;
    });
  }

  ngOnInit(): void {

    // Form
    this.filterForm();
    // View and Order Product Api's
    this.getViewProduct();
    this.getOrderProduct();
    this.getViewProductCount();
    this.getOrderProductCount();
  }


  //VIEW PRODUCT //
  private getViewProduct(): void {
    let param = removeEmptyKeys(this.getQueryParam());
    param.customerId = this.valueId.id;
    this.customerSandbox.ViewProductList(param);
  }

  // Get view product count
  private getViewProductCount(): void {
    const params: any = {};
    params.count = 1;
    params.limit = this.limit;
    params.offset = this.offset;
    params.customerId = this.valueId.id;
    params.productName = this.backupFormValue['ProductName'] ? this.backupFormValue['ProductName'] : '';
    params.sku = this.backupFormValue['SKU'] ? this.backupFormValue['SKU'] : '';
    this.customerSandbox.ViewProductListCount(params);
  }
  // Apply filter
  applyFilter(): void {
    this.filterValueUpdate();
    if (this.backupFormValue['ProductName'] || this.backupFormValue['SKU']) {
      if (this.show == true) {
        this.getViewProduct();
        this.getViewProductCount();
      } else {
        this.getOrderProduct();
        this.getOrderProductCount();
      }
      this.dropDownClose('dropdownContentFilter');
      this.dropDownClose('dropdownContent');
    }
  }

  // Reset Filter
  filterReset(): void {
    this.formObjFormGroup.reset();
    this.filterValueUpdate();
    if (this.show == true) {
      this.getViewProduct();
      this.getViewProductCount();
    } else {
      this.getOrderProduct();
      this.getOrderProductCount();
    }
    this.dropDownClose('dropdownContentFilter');
    this.dropDownClose('dropdownContent');
  }

  //ORDER PRODUCT //
  private getOrderProduct(): void {
    let param = removeEmptyKeys(this.getQueryParam());
    param.count = 0;
    // param.email = this.email;
    this.customerSandbox.OrderProductList(param);
   this.subscriptions.add(this.customerSandbox.OrderProductList$.subscribe(data => {
      if (data) {
        this.orderedList = data;
        this.orderedList.forEach(order => {
          order.orderIndex = order.orderStatus.findIndex((obj, index, array) => array.every(o => new Date(obj.createdOn) >= new Date(o.createdOn)));
        });
      };
    }));
  }

  // Order Product Count
  private getOrderProductCount(): void {
    const param: any = {};
    param.count = 1;
    param.offset = this.offset;
    // param.customerId = this.valueId.id;
        param.emailId = this.email;

    param.productName = this.backupFormValue['ProductName'] ? this.backupFormValue['ProductName'] : '';
    param.sku = this.backupFormValue['SKU'] ? this.backupFormValue['SKU'] : '';
    this.customerSandbox.OrderProductListCount(param);
  }

  // Get Query Param Data
  private getQueryParam() {
    const params = {
      limit: this.limit,
      offset: this.offset,
      currentPage: this.currentPage,
      emailId: this.email,
      productName: this.backupFormValue['ProductName'] ? this.backupFormValue['ProductName'] : '',
      sku: this.backupFormValue['SKU'] ? this.backupFormValue['SKU'] : '',
    };
    return params;
  }

  // Build Form
  private filterForm(): void {
    const formObjModel = structuredClone(objForm);
    const formGroupField = getFormControlsFieldsObj(formObjModel);
    this.formObjFormGroup = this.fb.group(formGroupField);
    Object.keys(formObjModel).forEach((element: any) => {
      this.dynamicObjControls[element] = getTypes(formObjModel[element], this.formObjFormGroup);
    });
    this.filterValueUpdate();
  }

  // Update filter Value
  private filterValueUpdate(): void {
    this.backupFormValue = structuredClone(this.formObjFormGroup?.value);
    this.formValueExists = Object.values(structuredClone(this.backupFormValue)).some((val: any) => !this.empty.includes(val));
    this.ref.detectChanges();
  }
  // Tab changes
  tabChanges(event: any): void {
    this.formObjFormGroup.reset();
    this.filterValueUpdate();
    this.show = event;
    if (this.show == true) {
      const value = 'pageInital'
      localStorage.setItem('pagination', value)
      this.getViewProduct();
      this.getViewProductCount();
    } else {
      const value = 'pageInital'
      localStorage.setItem('pagination', value)
      this.getOrderProduct();
      this.getOrderProductCount();
    }
  }

  // Page Change
  onPageChange(event: any, data): void {
    if (data == false) {
      localStorage.setItem('pagination', '')
      if (event.align == 'Left' || 'Last' || 'First') {
        this.offset = (event.index -= 1) * this.limit;
      }
      if (event.align == 'Right') {
        this.offset = (event.index) * this.limit;
      }
      this.getOrderProduct()
    }
    if (data == true) {

      localStorage.setItem('pagination', '')
      if (event.align == 'Left' || 'Last' || 'First') {
        this.offset = (event.index -= 1) * this.limit;
      }
      if (event.align == 'Right') {
        this.offset = (event.index) * this.limit;

      }
      this.getViewProduct()
    }
  }

  // Dropdown Close
  private dropDownClose(dropDownName): void {
    if (this.hasOwnProperty(dropDownName)) {
      this[dropDownName]?.close();
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}