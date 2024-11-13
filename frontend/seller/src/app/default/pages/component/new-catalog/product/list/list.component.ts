
// Angular imports
import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
// Third Party imports
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
// Components
import { ModalPopupComponent } from '../../../catalog/manage-product/modalpopup/modalpopup.component';
import { CategorymodalComponent } from '../../../catalog/manage-product/categorymodal/categorymodal.component';
import { BulkUpdateComponent } from '../../../../../../../../src/app/default/common/bulk-update/bulk-update.component';
// Pipes
import { CurrencySymbolPipe } from '../../../../../../../../src/app/default/shared/pipe/currency.pipe';
// Sandbox
import { CommonSandbox } from '../../../../../../../../src/app/core/common/common.sandbox';
import { ProductSandbox } from '../../../../../../../../src/app/core/product/product.sandbox';
import { ProductService } from '../../../../../../../../src/app/core/product/product.service';
import { NewProductSandbox } from '../../../../../../../../src/app/core/catalog/product/product.sandbox';
// Constants
import { DataService } from '../add/data.service';
import { badgeMappings, badgeStatusMappings, bulkActions, contentTranslate, customTable, fields, objForm, sort } from './list.constant';
import { getFormControlsFieldsObj, getTypes } from '../../../../../../../../src/app/default/shared/components/reusable-forms/form-constant';
import { itemsPerPage, itemsPerPageList } from '../../../../../../../../src/app/default/shared/components/reusable-pagination/pagination.constant';
import { className, configureAlertConfig, imagesList } from '../../../../../../../../src/app/default/shared/components/alert-content/alert.content.constant';
// Environment
import { environment } from '../../../../../../../../src/environments/environment';
import { RejectReasonComponent } from '../add/modals/reject-reason/reject-reason.component';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger("slideInOut", [
      transition(":enter", [
        style({ transform: "translateX(0%)" }),
        animate("0.5s ease-in", style({ transform: "translateX(-100%)" })),
      ]),
      transition(":leave", [
        style({ transform: "translateX(0%)" }),
        animate("0.5s ease-in", style({ transform: "translateX(-100%)" })),
      ]),
    ]),
  ],
  providers: [CurrencySymbolPipe]
})
export class ListComponent implements OnInit {

  // currency symbol
  public currency = JSON.parse(localStorage.getItem('adminCurrency'));

  @ViewChild("dropdownContent", { static: false }) dropdownContent!: ElementRef;
  @ViewChild("dropdownContentFilter", { static: false }) dropdownContentFilter!: ElementRef;

  //Dynamic columns
  backupData: any = structuredClone(customTable);
  dynamicColumnFields: any = structuredClone(customTable);

  // env 
  productUrl = environment.storeUrlRelatedProduct;

  // Pagination
  currentPage = 1;
  limit: number = itemsPerPage;
  offset = 0;
  pageSizeList: any = itemsPerPageList;
  queryData: any = {};
  pagination: boolean = true;

  // List
  productListArray: any[] = [];
  productArray = [];
  productArrayModel: any[];
  // check box
  selectedDatas: any = [];
  tableCheckbox = {
    isSelectAll: false
  };

  // image url
  imageUrl = environment.imageUrl;

  // filters dynamic columns
  backupColumns = structuredClone(fields);

  // Sort 
  sortOption: any = sort;
  sortname: string = ''
  sortOrder: any = ''


  // Common
  _Object = Object;
  empty = [null, '', undefined];

  // Alerts
  alertConfig = {};

  // Reusable form 
  formObjFormGroup: any;
  dynamicObjControls: any = {};
  backupFormValue: any = {};
  formValueExists = false;

  //count
  count: any = 0

  // different tab Active 

  AlltabStatus: any = '2'
  falgStatus: any = '';

  // Status Badge
  badgeConfig = badgeMappings;
  badgeStatusMappings = badgeStatusMappings;

  initalLoading: boolean = false;

  // Arrow functions
  trackByIndex = (index: number): number => index;

  // Subscriptions
  private subscriptions: Subscription = new Subscription();

  // bulk Action
  bulkAction = bulkActions;


  constructor(
    public productSandbox: ProductSandbox,
    public NewProductSandbox: NewProductSandbox,
    public router: Router,
    public formBuilder: UntypedFormBuilder,
    public toaster: ToastrService,
    public route: ActivatedRoute,
    public modal: NgbModal,
    public dataService: DataService,
    public translate: TranslateService,
    public toastr: ToastrService,
    public productService: ProductService,
    public ref: ChangeDetectorRef,
    private titleService: Title,
    public fb: UntypedFormBuilder,
    private modalService: NgbModal
  ) {
    this.titleService.setTitle("Products");
    this.subscriptions.add(this.productSandbox.productList$.subscribe((data) => {
      if (data) {
        this.productArray = data;
      }
    }));
  }

  ngOnInit(): void {
    // Form
    this.buildForm();
    // Query param route value
    this.routeSubscribe();
  }

  // Filter open
  open(): void {
    this.formObjFormGroup.patchValue(structuredClone(this.backupFormValue));
  }

  /*Table Actions*/
  buttonAction(e: any): void {
    switch (e.key) {
      case "threeDotMenu":
        if (e.actionType == "Edit") {
          this.goToEdit(e.productId);
        } else if (e.actionType == "Delete") {
          this.deleteProduct(e.productId, 'single');
        }
        break;
      case "checkBox":
        this.selectedDatas = e.selectedDatas;
        break;
    }
  }

  // Page change event pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.offset = (this.currentPage - 1) * this.limit;
    this.geTotalProductList();
  }

  // Per page change drop down
  pageSizeChange(e): void {
    this.onPageChange({ limit: e.id, offset: 0 });
  }

  // Filters
  applyFilter(): void {
    this.offset = 0;
    this.currentPage = 1;
    this.AlltabStatus = '2';
    this.filterValueUpdate();
    this.resetAll();
  }

  // Remove filter
  removeFilter(remove): void {
    this.offset = 0;
    this.currentPage = 1;
    this.AlltabStatus = '2';
    this.formObjFormGroup.controls[remove.key].reset();
    this.backupFormValue = [];
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
        'Product Title': '',
        'Price': '',
        'Status': '',
      });
    }
    this.filterValueUpdate();
    this.resetAll();
  }

  // Search reset
  clearSearch(): void {
    this.offset = 0;
    this.currentPage = 1;
    this.resetAll();
  }

  // Search name
  searchItems(): void {
    this.offset = 0;
    this.currentPage = 1;
    this.resetAll();
  }


  SortValueChange(newValue: any): void {
    this.sortname = newValue?.name;
    this.sortOrder = ['', null, undefined].includes(this.sortOrder) ? 'ASC' : this.sortOrder
    this.routeSubscribe();
  }

  SortValueChangeOrder(value): void {
    this.sortOrder = value;
    this.routeSubscribe();
  }

  // Bulk actions
  actionType(type: string): void {
    switch (type) {
      case 'resetCheckbox':
        this.closebutton();
        break;
      case 'exportExcel':
        this.EportdataAll();
        break
      case 'exportExcelAll':
        this.EportAll();
        break
      case 'bulkDelete':
        this.allProductDelete();
        break
      case 'bulkUpload':
        this.updateall();
        break
    }
  }

  // Dropdown Close
  private dropDownClose(dropDownName): void {
    if (this.hasOwnProperty(dropDownName)) {
      this[dropDownName]?.close();
    }
  }
  // Save columns
  saveColumns(data: any): void {
    this.backupColumns = structuredClone(data);
    this.showHideTableColumn();
  }

  // Query param value and pagination
  private getQueryParam() {
    const params = {
      limit: this.limit,
      offset: this.offset,
      currentPage: this.currentPage,
      keyword: this.backupFormValue['Search'] ?? '',
      productName: this.backupFormValue['Product Title'] ?? '',
      price: this.backupFormValue['Price'] ? this.backupFormValue['Price'] : '',
      status: this.backupFormValue['Status'] ? this.backupFormValue['Status'] : '',
      sortBy: this.sortname,
      sortOrder: this.sortOrder
    };
    return params;
  }

  // Query param route value subscribe
  private routeSubscribe(): void {
    let paramsValue: any = {};
    this.subscriptions.add(this.route.queryParams.subscribe(params => {
      paramsValue = params;
      this.limit = paramsValue.limit ? Number(paramsValue.limit) : this.limit;
      this.offset = paramsValue.offset ? Number(paramsValue.offset) : 0;
      this.currentPage = paramsValue.currentPage ? Number(paramsValue.currentPage) : 1;
      this.formObjFormGroup.patchValue({
        'Product Title': paramsValue?.productName ?? "",
        'Price': paramsValue?.price ?? "",
        'Search': paramsValue?.keyword ?? "",
      });
      this.filterValueUpdate();
    }));
    this.geTotalProductList();
    this.getTotalProductCount();
  }

  //Show hide table column
  private showHideTableColumn(): void {
    this.dynamicColumnFields.forEach(val => {
      if (val.hasOwnProperty('filterColName')) {
        val.checked = this.backupColumns[val.filterColName];
      }
    })
  }

  // Value update in queryparams for pagination
  private updateQueryParam(): void {
    this.router.navigate([], { queryParams: this.getQueryParam(), queryParamsHandling: 'merge' });
  }

  // intialize form
  private buildForm(): void {
    const formObjModel = structuredClone(objForm);
    const formGroupField = getFormControlsFieldsObj(formObjModel);
    this.formObjFormGroup = this.fb.group(formGroupField);
    Object.keys(formObjModel).forEach((element: any) => {
      this.dynamicObjControls[element] = getTypes(formObjModel[element], this.formObjFormGroup);
    });
    this.filterValueUpdate();
  }

  //Reset All
  private resetAll(): void {
    this.geTotalProductList();
    this.getTotalProductCount();
    this.dropDownClose('dropdownContentFilter');
    this.dropDownClose('dropdownContent');
  }

  //Filter Value Update
  private filterValueUpdate(): void {
    this.backupFormValue = structuredClone(this.formObjFormGroup?.value);
    this.formValueExists = Object.values(structuredClone(this.backupFormValue)).some((val: any) => !this.empty.includes(val));
    this.ref.detectChanges();
  }

  // Reset checkbox
  private reset(isChecked = false): void {
    this.productListArray.forEach(val => val.checked = isChecked);
    this.selectedDatas = this.productListArray.filter(val => val?.checked);
  }

  //Add product
  addProduct(): void {
    this.resetServices();
    this.ref.detectChanges();
    this.router.navigate(['/new-catalog/products/categories']);
  }

  // Rest data services
  resetServices(): void {
    this.dataService.setData([]);
    this.dataService.setDatacategoriesRightArray({});
    this.dataService.setDatacategoriesLeftArray({});
    this.dataService.setDataproductDetailsPagePrev('');
    this.dataService.setDataProductDetails({});
    this.dataService.setPricingDetails({});
    this.dataService.setDataProductSeo({});
  }

  //FLag status
  tabRoutingFlag(value): void {
    this.falgStatus = value
    this.AlltabStatus = ''
    this.geTotalProductList();
    this.getTotalProductCount();
  }

  //Tab change
  tabRouting(value): void {
    this.falgStatus = ''
    this.AlltabStatus = value;
    this.geTotalProductList();
    this.getTotalProductCount();
  }
  // List api 
  geTotalProductList(): void {
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    params.keyword = this.backupFormValue?.['Search'] ?? '';
    params.count = 0;
    params.sortBy = this.sortname;
    params.sortOrder = this.sortOrder;
    params.productName = this.backupFormValue?.['Product Title'] ? this.backupFormValue?.['Product Title'] : '';
    params.price = this.backupFormValue?.['Price'] ? this.backupFormValue?.['Price'] : '';
    params.status = ['2', null, undefined].includes(this.AlltabStatus) ? ['', null, undefined].includes(this.backupFormValue?.['Status']) ? '' : this.backupFormValue?.['Status'] : this.AlltabStatus;

    params.approvalFlag = this.falgStatus;
    this.productSandbox.getProductList(params);
    this.subscriptions.add(this.productSandbox.productList$.subscribe((data) => {
      this.productListArray = data;
      if (data) {
        data.forEach(element => {
          element.truncatedText = element.name?.length > 100 ? element.name.slice(0, 100) : element.name;
        })
        this.initalLoading = data.length > 0 ? false : true
        const allApproved = data.every(product => product.approvalFlag === 1);
        this.alertConfig = allApproved ? configureAlertConfig() : configureAlertConfig(contentTranslate.failed, imagesList.failed, className.failed);
        this.reset();
      }
    }));
    this.updateQueryParam();
  }

  // Count api call
  getTotalProductCount(): void {
    const params: any = {};
    params.count = 1;

    params.limit = this.limit;
    params.offset = this.offset;
    params.keyword = this.backupFormValue?.['Search'] ?? '';
    params.count = 1;
    params.sortBy = this.sortname;
    params.sortOrder = this.sortOrder;
    params.productName = this.backupFormValue?.['Product Title'] ? this.backupFormValue?.['Product Title'] : '';
    params.price = this.backupFormValue?.['Price'] ? this.backupFormValue?.['Price'] : '';
    params.status = ['2', null, undefined].includes(this.AlltabStatus) ? ['', null, undefined].includes(this.backupFormValue?.['Status']) ? '' : this.backupFormValue?.['Status'] : this.AlltabStatus;
    params.approvalFlag = this.falgStatus;

    this.productSandbox.getProductListCount(params);
    this.subscriptions.add(this.productSandbox.totalProductCount$.subscribe((val) => {
      this.count = val;
    }));
  }
  // got to edit product page
  goToEdit(productId): void {
    this.productService.editCategoryPop("");
    this.resetServices();
    this.ref.detectChanges();
    this.router.navigate(["/new-catalog/products/categories/", productId], {
      queryParams: this.getQueryParam(),
    });
  }
  // All product Delete
  allProductDelete(): void {
    const modelRef = this.modal.open(ModalPopupComponent, {
      size: "sm",
      windowClass: "assignattributesmodal-categories delete-modal",
      backdrop: "static",
      backdropClass: "createcr",
      modalDialogClass: 'modal-dialog-centered'
    });
    modelRef.componentInstance.key = "";
    modelRef.componentInstance.deleteMessage = 'Product';
    modelRef.componentInstance.productId = this.selectedDatas.map(val => val.productId).toString();
    modelRef.result.then((result) => {
      if (result == "deleted") {
        let obj = {
          productId: this.selectedDatas.map(val => val.productId).toString()
        }
        this.NewProductSandbox.ProductMultiDelete(obj);
        this.subscriptions.add(this.NewProductSandbox.ProductMultiDelete$.subscribe((val) => {
          if (val?.status == 1) {
            this.geTotalProductList();
            this.getTotalProductCount();
            this.selectedDatas = [];
          }
        }));
      }
    });
  }

  // Singel product delete
  deleteProduct(id, name): void {
    const modelRef = this.modal.open(ModalPopupComponent, {
      size: "sm",
      windowClass: "assignattributesmodal-categories delete-modal",
      backdrop: "static",
      backdropClass: "createcr",
      modalDialogClass: 'modal-dialog-centered'
    });
    modelRef.componentInstance.key = "";
    modelRef.componentInstance.deleteMessage = 'Product';
    modelRef.componentInstance.productId = id;
    modelRef.result.then((result) => {
      if (result === "deleted") {
        this.productSandbox.doProductDelete({ productId: id });
        this.subscriptions.add(this.productSandbox.productDeleteLoaded$.subscribe(_delete => {
          if (_delete === true) {
            this.getTotalProductCount();
          }
        }));
      }
    });
  }

  // delete multiple product event
  deleteMultipleProduct() {
    if (this.selectedDatas.length === 0) {
      this.toaster.error("Please choose a product for delete");
      return;
    }
    const params: any = {};
    params.productId = this.selectedDatas.map((val) => val.productId).toString();;
    this.productSandbox.doProductBulkDelete(params);
    this.subscriptions.add(this.productSandbox.productBulkDeleteLoaded$.subscribe((data) => {
      if (data === true) {
        this.geTotalProductList();
      }
    }));
  }
  // Export product
  public exportProduct(): void {
    if (this.selectedDatas.length === 0) {
      this.toaster.error("please choose a product for export");
      return;
    }
    const params: any = {};
    params.productId = this.selectedDatas.map((val) => val.productId).toString();
    this.productSandbox.exportProduct(params);
  }
  //Export All Product
  public exportAllProduct(): void {
    const params: any = {};
    params.vendorId = JSON.parse(localStorage.getItem("vendorUser")).vendorId;
    this.productSandbox.allExportProduct(params);
  }

  //Eport data
  Eportdata(id): void {
    const params: any = {};
    params.productId = id;
    this.productSandbox.exportProduct(params);
  }

  //Export Data check box 
  EportdataAll(): void {
    const params: any = {};
    params.productId = this.selectedDatas.map(val => val.productId);
    this.productSandbox.exportProduct(params);
  }
  // Export All wise
  EportAll(): void {
    const params: any = {};
    params.productId = [];
    this.productSandbox.exportProduct(params);
  }
  // Close button
  closebutton(): void {
    this.productListArray.forEach((val) => (
      val.selected = false
    ));
    this.reset();
    this.tableCheckbox.isSelectAll = false;
    this.tableCheckbox = { ...this.tableCheckbox };
  }
  //Open category modal
  opencategory(id): void {
    this.subscriptions.add(this.productSandbox.productList$.subscribe((data) => {
      if (data) {
        this.productArrayModel = data.filter((res) => res.productId == id);
      }
    }));
    const modelRef = this.modal.open(CategorymodalComponent, {
      size: 'xs', windowClass: 'assignattributesmodal-categories orderstatushistory delete-modal', backdrop: 'static', backdropClass: 'createcr', centered: true,
    });
    modelRef.componentInstance.userId = id;
    modelRef.componentInstance.userModel = this.productArrayModel;
  }

  // Update All
  updateall(): void {
    const modelRef = this.modal.open(BulkUpdateComponent, {
      size: 'md', backdrop: 'static', backdropClass: 'createcr', centered: true, windowClass: "assignattributesmodal-categories",
    });
    modelRef.componentInstance.Name = 'common.Product Status';
    modelRef.componentInstance.Content = "BulkUpdate.ChooseMultipleProducts";
    modelRef.componentInstance.action = 'Single';
    modelRef.componentInstance.fulfillment = 'product'



    modelRef.result.then((result) => {
      if (result?.modelStatus == 'Save') {
        const params = {
          productIds: this.selectedDatas.map(val => val.productId).toString(),
          statusId: ['', null, undefined].includes(result?.StatusChange) ? '' : result?.StatusChange == 1 ? 1 : 0,
          dateAvailableFrom: result.obj.dateAvailableFrom,
          price: result.obj.price,
          inventory: result.obj.inventory
        }
        const cleanedData = Object.fromEntries(
          Object.entries(params).filter(([_, value]) => value !== undefined && value !== null && value !== "")
        );
        if (result.empty !== 0) {
          this.productService.bulkproductStatusUpdate(cleanedData).subscribe((res: any) => {
            if (res?.status == 1) {
              this.selectedDatas = [];
              this.geTotalProductList();
            }
          })
        }
      }
    })
  }

  rejectReasonData(data) {
    if (JSON.parse(data.rejectReason)?.length > 0) {
      let product = []
      product.push({ "containerName": data.containerName, "image": data.image })
      const modelRef = this.modalService.open(RejectReasonComponent, {
        size: 'xl', windowClass: 'assignattributesmodal-categories', backdrop: 'static', backdropClass: 'createcr', centered: true,
      });

      modelRef.componentInstance.rejectReason = JSON.parse(data.rejectReason);
      modelRef.componentInstance.productImage = product
      modelRef.componentInstance.productName = data.name
    }
  }
  // Product preview

  productPreview(item): void {

    let url = this.productUrl + item.productSlug;
    window.open(url, '_blank')
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}
