/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// angular common imports 
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

//  third party imports 
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';

// sandbox 
import { TaxSandbox } from '../../../../../../../../core/admin/settings/localizations/tax/tax.sandbox';
import { TaxService } from '../../../../../../../../core/admin/settings/localizations/tax/tax.service';
// component 
import { TaxAddComponent } from '../add/add.component';
import { DeleteConfirmationDialogComponent } from '../../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';

// constant 
import { badgeStatusMappings, customTable, filterFields, removeEmptyKeys } from './list.constant';
import { UntypedFormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { getFormControlsFields, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';


@Component({
  selector: 'app-spurt-taxlist',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class TaxListComponent implements OnInit {

  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild("myInput") myInput: ElementRef;

  //reusable common table
  dynamicColumnFields: any = structuredClone(customTable);

  //badge
  badgeStatusMappings = badgeStatusMappings;

  // list 
  public type = 'edit';

  // filter form
  filterSearch: any = {};
  limit: number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;
  offset = 0
  public currentPage = 1;
  public keyword = '';

  private pageoffset: number;

  // Reusable form 
  dynamicObjControls: any = {};
  backupFormValue: any = {};
  private formObjFormGroup: any;
  private formValueExists = false;

  // Common
  _Object = Object;
  empty = [null, '', undefined];

  // subscriptions
  private subscriptions: Subscription = new Subscription();
  taxCount: any;

  constructor(
    public modal: NgbModal,
    public sandbox: TaxSandbox,
    private taxService: TaxService,
    private router: Router,
    public titleService: Title,
    private fb: UntypedFormBuilder,
    public route: ActivatedRoute,
  ) {
    this.titleService.setTitle('Settings | Localization');
  }

  ngOnInit() {
    this.buildForm();
    /*query param route value*/
    this.routeSubscribe()

  }

  /*Table Actions*/
  buttonAction(e: any): void {
    switch (e.key) {
      case "threeDotMenu":
        if (e.actionType == "Delete") {
          this.deleteTax(e?.taxId)
        } else if (e.actionType == "Edit") {
          this.editTax(e)
        }
        break;

    }
  }

  addTax(data, type) {
    const modalRef = this.modal.open(TaxAddComponent, {
      windowClass: 'add-local', keyboard: false, backdrop: 'static', animation: false,
    });
    this.taxService.setEditedValue('');
    modalRef.result.then((result) => {
      if (result == 'clear') {
        this.routeSubscribe();
      }
    });
  }


  editTax(data: any) {
    const modalRef = this.modal.open(TaxAddComponent, {
      windowClass: 'add-local', keyboard: false, backdrop: 'static', animation: false,
    });
    this.taxService.setEditedValue(data);
    modalRef.componentInstance.edit = this.type;
    modalRef.componentInstance.id = data.countryId;
    modalRef.result.then((result) => {
      if (result == 'clear') {
        this.routeSubscribe();
      }
    });
  }

  deleteTax(taxId) {
    const modelRef = this.modal.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.componentInstance.deleteMessage = 'Tax';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.sandbox.deleteTax({ taxId: taxId });
        this.regSubscribeEvents();
      }
    });
  }

  /*Remove filter*/
  removeFilter(remove): void {
    this.formObjFormGroup.controls[remove.key].reset();
    this.filterValueUpdate();
    this.resetAll();
  }

  // pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.taxList();
  }

  // Filters
  applyFilter(): void {
    this.filterValueUpdate();
    this.resetAll();
  }

  private regSubscribeEvents(): void {
    this.sandbox.getTaxDelete$.subscribe(_delete => {
      if (_delete && _delete.status === 1) {
        this.taxList(this.pageoffset);
        this.countPaginationApi();
      }
    });
  }

  private taxList(offset: any = 0): void {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = 0;
    this.sandbox.getTaxList(params);
    this.updateQueryParam();
  }

  private countPaginationApi(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = 1;
    this.sandbox.getTaxListCount(params);
    this.sandbox.taxListCount$.subscribe(val => {
      if (val) {
        this.taxCount = val.data
      }
    })

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
    };
    return params;
  }

  // Reset All
  private resetAll(): void {
    this.onPageChange({ limit: this.limit, offset: 0 });
    this.countPaginationApi();
    this.dropDownClose('myDropdown');
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

  // Dropdown Close
  private dropDownClose(dropDownName): void {
    if (this.hasOwnProperty(dropDownName)) {
      this[dropDownName]?.close();
    }
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
        'search': paramsValue.keyword ?? ""
      });
      this.filterValueUpdate();
    }));
    this.taxList();
    this.countPaginationApi();
  }
}
