import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { badgeMappings, bulkActions, customTable, filterFields, removeEmptyKeys } from './seller-product.constant';
import { getImageUrl } from 'src/theme/default/admin/shared/components/common-table/common-table/common.constant';
import { getFormControlsFields, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';
import { RejectsModelComponent } from '../../rejects-model/rejects-model.component';
import { environment } from 'src/environments/environment';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder } from '@angular/forms';
import { SellerProductSandox } from 'src/core/admin/vendor/manage-products/sellerProduct/sellerProduct.sandbox';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { SellerProduct } from 'src/core/admin/vendor/manage-products/sellerProduct/sellerProduct.service';
import { query } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.scss']
})
export class SellerProductsComponent implements OnInit {

  @ViewChild('myDropdown') myDropdown!: NgbDropdown;

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

  // Status Badge
  badgeConfig = badgeMappings;

  // environment
  imageUrl: string = environment.imageUrl;

  // Bulk Action
  bulkAction = bulkActions;

  // Seller Id
  sellerId: number | string;

  //Seller name
  sellerName: string;

  // currency
  public currency = JSON.parse(sessionStorage.getItem('adminCurrency'));

  constructor(
    public titleService: Title,
    private router: Router,
    public route: ActivatedRoute,
    public service: SellerProduct,
    public sandbox: SellerProductSandox,
    private ref: ChangeDetectorRef,
    public modalService: NgbModal,
    public fb: UntypedFormBuilder,
    public modal: NgbModal,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.titleService.setTitle('All Products');

    // form
    this.buildForm();
    /*query param route value*/
    this.routeSubscribe();
  }

  /*Table Actions*/
  buttonAction(e: any): void {
    switch (e.key) {
      case "threeDotMenu":
        if (e.actionType == 'Approve') {
          if (e.approvalFlag == 1) {
            this.toastr.error('This product is already Approved')
          } else {
            this.approveProduct(e);
          }
        }
        else if (e.actionType == 'Reject') {
          if (e.approvalFlag == 2) {
            this.toastr.error('This product is already Rejected')
          } else {
            this.rejectComment(e);
          }
        }
        break;
      case "checkBox":
        this.selectedDatas = e.selectedDatas;
        break;
      case "toggle":
        this.statusToggle(e)
        break;
    }
  }

  // Approve Product
  approveProduct(e) {
    const param = {
      productIds: [e.productId],
      approvalFlag: '1',
    };
    this.sandbox.approveProduct(param)
    this.subscriptions.add(this.sandbox.approveProduct$.subscribe(val => {
      if (val?.status == 1) {
        this.routeSubscribe();
      }
    }));
  }

  // Reject Product modal popup
  rejectComment(e) {
    const modalRef2 = this.modal.open(RejectsModelComponent, {
      windowClass: 'add-local', keyboard: false, backdrop: 'static', centered: false, animation: false,
    });
    modalRef2.componentInstance.fullData = e;
    modalRef2.result.then(result => {
      if (result === 'success') {
        this.routeSubscribe();
      }
    });
  }

  goToDetail(data) {
    const value: any = {
      name: 'AllProducts',
      id: data.productId,
      sellerId: data.vendorId,
      approvalFlag: data.approvalFlag
    }
    this.router.navigate(["/vendors/manage-products/product-detail", data.productId], { queryParams: value })
  }

  // Product Status Change
  private statusToggle(data): void {
    const params = {
      status: data.isActive ? 1 : 0,
      id: data.productId
    };
    this.sandbox.productStatus(params);
  }

  // Export Excel
  exportExcel() {
    const param = {
      productId: this.selectedDatas.map(list => list?.productId)
    };
    this.sandbox.MultipleProductDataExport(param);
    this.subscriptions.add(this.sandbox.MultipleProductDataExport$.subscribe(val => {
      this.resetCheckbox();
    }))
  }

  //Export ExcelAll
  exportExcelAll() {
    const param = {
      productId: []
    };
    this.sandbox.MultipleProductDataExport(param)
    this.subscriptions.add(this.sandbox.MultipleProductDataExport$.subscribe(val => {
      this.resetCheckbox();
    }))
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
    if (this.sellerId) {
      param.vendorId = this.sellerId;
    }
    this.sandbox.sellerProductList(param);
    this.subscriptions.add(this.sandbox.sellerProductList$.subscribe(element => {



      this.approvedProductList = element;
      this.approvedProductList?.forEach((element) => {

        if (!['', null, undefined].includes(param?.vendorId)) {

          this.sellerName = element?.vendorName
        }

        element.isDisabled = element.approvalFlag == 1 ? false : true;
        element.truncatedText = element.name?.length > 80 ? element.name.slice(0, 80) : element.name;
        if (this.empty.includes(element.image)) {
          element.image = "assets/error-images/Load-icon-Products.png";
        } else {
          element.image = getImageUrl(
            this.imageUrl,
            element.containerName,
            element.image
          );
          this.ref.detectChanges();
        }
      });
    }))
    this.updateQueryParam();
  }

  // Approved product list
  productCount(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = 1;
    if (this.sellerId) {
      params.vendorId = this.sellerId;
    }
    this.sandbox.sellerProductCount(params);
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
      vendorName: this.backupFormValue['sellerName'] ?? '',
      productName: this.backupFormValue['productName'] ? this.backupFormValue['productName'] : '',
      status: this.backupFormValue['status'] ? this.backupFormValue['status'] : '',
      companyName: this.backupFormValue?.['companyName'] ? this.backupFormValue?.['companyName'] : ''
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
        'sellerName': paramsValue.vendorName ?? "",
        'companyName': paramsValue.companyName ?? "",
        'productName': paramsValue.productName ?? "",
        'status': paramsValue.status ? paramsValue.status : null,
        'search': paramsValue.keyword ?? ""
      });
      this.filterValueUpdate();
    }));
    this.productList();
    this.productCount();
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
        this.exportExcelAll();
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}