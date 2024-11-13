/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <mailto:support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// Angular imports
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
// Third Party imports
import { Subscription } from 'rxjs';
// Components
import { DeleteConfirmationDialogComponent } from 'src/theme/default/admin/shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
// Sandbox
import { BannerSandbox } from 'src/core/admin/cms/banners/banner.sandbox';
//Service
import { BannerService } from 'src/core/admin/cms/banners/banner.service';
import { ConfigService } from 'src/core/admin/service/config.service';
// Constants  
import { getImageUrl } from 'src/theme/default/admin/shared/components/common-table/common-table/common.constant';
import { getFormControlsFields, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';
import { bulkActions, customTable, filterFields, removeEmptyKeys } from './list.constant';
// environment
import { environment } from 'src/environments/environment';
import { BannerimageviewmodalComponent } from '../bannerimageviewmodal/bannerimageviewmodal.component';

@Component({
  selector: 'app-spurt-cms-banner-list',
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
export class BannerListComponent implements OnInit, OnDestroy {
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

  // environment
  imageUrl: string = environment.imageUrl;

  // Bulk Action
  bulkAction = bulkActions;

  // Seller Id
  sellerId: number | string;

  constructor(
    public titleService: Title,
    private router: Router,
    public route: ActivatedRoute,
    public sandbox: BannerSandbox,
    private service: BannerService,
    private configService: ConfigService,
    private ref: ChangeDetectorRef,
    public modalService: NgbModal,
    public fb: UntypedFormBuilder,
    public modal: NgbModal) { }

  ngOnInit(): void {
    this.titleService.setTitle('Banners');

    // form
    this.buildForm();
    /*query param route value*/
    this.routeSubscribe();
  }

  /*Table Actions*/
  buttonAction(e: any): void {
    switch (e.key) {
      case "threeDotMenu":
        if (e.actionType == "Edit") {
          this.editBanner(e);
        } else if (e.actionType == 'Delete') {
          this.deleteBanner(e.bannerId);
        }
        break;
      case "checkBox":
        this.selectedDatas = e.selectedDatas;
        break;
    }
  }

  //edit Banner Data
  editBanner(bannerData) {
    this.router.navigate(['/cms/manage-banners/banners/edit', bannerData.bannerId], { queryParams: this.queryData });
  }
  //deleteBanner data
  deleteBanner(bannerId) {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.componentInstance.deleteMessage = 'Banner'
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.sandbox.deletebanner({ bannerId: bannerId });
        this.sandbox.getdeletebanner$.subscribe(val => {
          if (val?.status == 1) {
            this.productList();
            this.productCount();
          }
        });
      }
    });
  }

  // Export Excel
  exportExcel() {
    const param: any = {};
    param.bannerId = this.selectedDatas.map(id => id.bannerId);
    this.sandbox.exportBanner(param);
    this.subscriptions.add(this.sandbox.exportExcelLoading$.subscribe(val => {
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

  //Reset All
  private resetAll(): void {
    this.onPageChange({ limit: this.limit, offset: 0 });
    this.productCount();
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

  // Approved product list
  productList(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    let param = removeEmptyKeys(this.getQueryParam());
    param.count = 0;
    param.approvalFlag = 1;
    if (this.sellerId) {
      param.vendorId = this.sellerId
    }
    this.sandbox.getBannerList(param);
    this.subscriptions.add(this.sandbox.getbannerlist$.subscribe(element => {
      this.approvedProductList = element;
      this.approvedProductList?.forEach((element) => {
        if (!this.empty.includes(element.linkType)) {
          element.type = element.linkType == 1 ? 'Custom' : element.linkType == 2 ? 'Product' : element.linkType == 3 ? 'Category' : '';
        }
        if (element.bannerImages.length > 0 && element.bannerImages != undefined) {
          element.bannerImageCount = element.bannerImages.length;
          this.ref.detectChanges();
        } else {
          element.bannerImageCount = '-'
        }
        element.date = element.modifiedDate ? element.modifiedDate : element.createdDate

        // if (this.empty.includes(element.image)) {
        //   element.image = "assets/error-images/Load-icon-Products.png";
        // } else {
        //   element.image = getImageUrl(this.imageUrl, element.imagePath, element.image
        //   );
        //   this.ref.detectChanges();
        // }
      });
    }))
    this.updateQueryParam();
  }

  // Approved product list
  productCount(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = 1;
    this.sandbox.getBannerListCount(params);
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
      keyword: this.backupFormValue['search'] ?? ''
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

  // Bulk actions
  actionType(type: string): void {
    switch (type) {
      case 'resetCheckbox':
        this.resetCheckbox();
        break;
      case 'delete':
        this.bulkDelete();
        break;
      case 'exportExcel':
        this.exportExcel()
        break;
    }
  }

  bulkDelete() {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.result.then((result) => {
      if (result === 'deleted') {

        const param: any = {};
        param.bannerId = this.selectedDatas.map(id => id.bannerId);
        this.sandbox.bulkDelete(param);
        this.sandbox.getdeletebanner$.subscribe(_delete => {
          if (_delete) {
            if (_delete.status === 1) {
              ;
              this.productList();
              this.productCount();
            }
          }
        });
      }
    });
  }

  //add Banner
  addBanner() {
    this.service.setBannerListData('');
    this.router.navigate(['/cms/manage-banners/banners/add'], { queryParams: this.queryData });
  }
  // for buid and navigate link
  link(link) {
    let url: string = '';
    if (!/^http[s]?:\/\//.test(link)) {
      url += 'http://';
    }

    url += link;
    window.open(url);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  openbannerviewmodal(data: any) {
    const modelRef = this.modalService.open(BannerimageviewmodalComponent, {
      size: 'sm', windowClass: 'imageviewerModal', backdrop: 'static', backdropClass: 'createcr',
      modalDialogClass: 'modal-dialog-centered'
    });
    modelRef.componentInstance.bannerDetails = data.bannerImages;
    modelRef.componentInstance.banerName = data.title;
  }

}
