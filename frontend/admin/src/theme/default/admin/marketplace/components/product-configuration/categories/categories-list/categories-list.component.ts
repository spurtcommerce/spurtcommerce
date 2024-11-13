// Angular imports
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
// Third Party imports
import { Subscription } from 'rxjs';
// Components
import { DeleteConfirmationDialogComponent } from '../../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
// Sandbox
import { CategoriesSandbox } from 'src/core/admin/catalog/category/categories.sandbox';
import { LayoutsSandbox } from 'src/core/admin/catalog/layout/layout.sandbox';
// Constants  
import { getImageUrl } from 'src/theme/default/admin/shared/components/common-table/common-table/common.constant';
import { bulkActions, customTable, filterFields, removeEmptyKeys } from './categories-list.constant';
import { getFormControlsFields, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';
// environment
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit, OnDestroy {
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
  categoriesList = [];

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

  // environment
  imageUrl: string = environment.imageUrl;

  // Bulk Action
  bulkAction = bulkActions;

  constructor(
    public titleService: Title,
    private router: Router,
    public route: ActivatedRoute,
    private ref: ChangeDetectorRef,
    public modalService: NgbModal,
    public fb: UntypedFormBuilder,
    public categorySandbox: CategoriesSandbox,
    public layoutSandbox: LayoutsSandbox) { }

  ngOnInit(): void {
    this.titleService.setTitle('Categories');

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
          this.router.navigate(['/vendors/product-config/categories/edit', e.categoryId]);
        }
        if (e.actionType == 'Delete') {
          this.deleteCategory(e.categoryId);
        }
        break;
      case "checkBox":
        this.selectedDatas = e.selectedDatas;
        break;
    }
  }

  // Delete Category modal popup
  deleteCategory(categoryId) {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.componentInstance.deleteMessage = 'Category'
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        const params: any = {};
        params.categoryId = categoryId;
        this.categorySandbox.deleteCategory(params);
        this.subscriptions.add(this.categorySandbox.getCategoriesDelete$.subscribe(_delete => {
          if (_delete) {
            if (_delete.user.status === 1) {
              this.routeSubscribe();
            }
          }
        }));
      }
    });
  }

  // Export Excel
  exportExcel() {
    const param: any = {};
    param.categoryId = this.selectedDatas?.map(res=> res.categoryId)
    this.categorySandbox.CategoryExcel(param);
      this.subscriptions.add(this.subscriptions.add(this.categorySandbox.CategoryExportExcel$.subscribe(val => {
        if(val){
          this.resetCheckbox();
        }
      })))
  }
  exportExcelAll(){
    const param: any = {};
    param.categoryId = []  
    this.categorySandbox.ExportAllExcel(param);
      this.subscriptions.add(this.subscriptions.add(this.categorySandbox.ExportAllExcel$.subscribe(val => {
        if(val){
          this.resetCheckbox();
        }
      })))
  }

  // Reset checkbox
  private reset(isChecked = false) {
    this.categoriesList.forEach(val => val.checked = isChecked);
    this.selectedDatas = this.categoriesList.filter(val => val?.checked);
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
        'categories': '',
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
    this.categorySandbox.categoryList(param);
    this.subscriptions.add(this.categorySandbox.getCategoriesList$.subscribe(element => {
      this.categoriesList = element;
      this.categoriesList?.forEach((element1) => {
        if(element1){
        if (['',null,undefined].includes(element1.image)) {
          element1.images = "assets/error-images/Load-icon-Products.png";
        } else {
          element1.images = getImageUrl(
            this.imageUrl,
            element1.imagePath,
            element1.image
          );
          this.ref.detectChanges();
        }}
      });
    }))
    this.updateQueryParam();
  }

  // Approved product list
  productCount(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = 1;
    this.categorySandbox.getCategoryListCount(params);
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
      name: this.backupFormValue['categories'] ?? '',
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
        'categories': paramsValue.name ?? "",
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
          break;
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}