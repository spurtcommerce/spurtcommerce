/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

//angular
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
// third Party 
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

//Sandbox and service 
import { CurrencySandbox } from '../../../../../../../../core/admin/settings/localizations/currency/currency.sandbox';
import { CurrencyService } from '../../../../../../../../core/admin/settings/localizations/currency/currency.service';

//  Component 
import { CurrencyAddComponent } from '../add/add.component';
import { DeleteConfirmationDialogComponent } from '../../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';

//constant
import { customTable, badgeStatusMappings, filterFields, removeEmptyKeys } from './list.constant';
import { getFormControlsFields, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';


@Component({
  selector: 'app-spurt-currencylist',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class CurrencyListComponent implements OnInit {
  // Decorators 
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild("myInput") myInput: ElementRef;

  //reusable common table
  dynamicColumnFields: any = structuredClone(customTable);

  //badge
  badgeStatusMappings = badgeStatusMappings;

  //list
  public type = 'edit';
  limit: number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;
  // pagination 
  public currentPage: number = 1;
  //Filter
  filterSearch: any = {};
  offset: number = 0;
  keyword: any;

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
  currencyDataCount: any;
  constructor(
    public modal: NgbModal,
    public sandbox: CurrencySandbox,
    private currencyService: CurrencyService,
    private router: Router,
    public titleService: Title,
    private fb: UntypedFormBuilder,
    public route: ActivatedRoute,
  ) {
    this.titleService.setTitle('Settings | Localization');
  }

  ngOnInit() {
    this.buildForm();
    this.routeSubscribe();
  }


  /*Remove filter*/
  removeFilter(remove): void {
    this.formObjFormGroup.controls[remove.key].reset();
    this.filterValueUpdate();
    this.resetAll();
  }
  // Filters
  applyFilter(): void {
    this.filterValueUpdate();
    this.resetAll();
  }

  /*Reset filters*/
  filterReset(type: string): void {
    if (type == 'clearAll') {
      this.formObjFormGroup.reset()
    } else {
      this.formObjFormGroup.patchValue({
        'search': '',
      });
    }
    this.filterValueUpdate();
    this.resetAll();
  }

  /*Table Actions*/
  buttonAction(e: any): void {
    switch (e.key) {
      case "threeDotMenu":
        if (e.actionType == "Delete") {
          this.deleteCurrency(e?.currencyId)
        } else if (e.actionType == "Edit") {
          this.editCurrency(e)
        }
        break;
    }
  }

  addCurrency(data, type): void {
    const modalRef = this.modal.open(CurrencyAddComponent, {
      windowClass: 'add-local', keyboard: false, backdrop: 'static', animation: false,
    });
    this.currencyService.setEditedValue('');
    modalRef.result.then((result) => {
      if (result == 'clear') {
        this.routeSubscribe();
          }
      });
  }

  
  editCurrency(data:any){
    const modalRef = this.modal.open(CurrencyAddComponent, {
      windowClass: 'add-local', keyboard: false, backdrop: 'static', animation: false,
    });
    this.currencyService.setEditedValue(data);
    modalRef.componentInstance.edit = this.type;
    modalRef.componentInstance.id = data.countryId;
    modalRef.result.then((result) => {
      if (result == 'clear') {
        this.routeSubscribe();
          }
      });
  }


  currencyList() {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = 0;
    this.sandbox.getCurrencyList(params);
    this.updateQueryParam();
  }

  countPaginationApi() {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = 1;
    this.sandbox.getCurrencyListCount(params);
    this.sandbox.currencyListCount$.subscribe(val=>{
      this.currencyDataCount = val?.data;
    })
  }


  // pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.currencyList();
  }

  // // edit
  // editCurrency(value: any) {
  //   this.editedCurrencyValue = this.currencyService.setEditedValue(value);
  //   this.router.navigate(['/settings/local/currency/edit', value.currencyId]);
  // }

  // delete
  deleteCurrency(currencyId) {
    const modelRef = this.modal.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
    });
    modelRef.componentInstance.deleteMessage = 'Currency';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.sandbox.deleteCurrency({ currencyId: currencyId });
        this.regSubscribeEvents();
      }
    });
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

  private regSubscribeEvents() {
    this.sandbox.getCurrencyDelete$.subscribe(_delete => {
      if (_delete && _delete.status === 1) {
        this.currencyList();
        this.countPaginationApi();
      }
    });
  }

  // Query param value and pagination
  private getQueryParam(): any {
    const params = {
      limit: this.limit,
      offset: this.offset,
      currentPage: this.currentPage,
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

  // Value update in queryparams for pagination
  private updateQueryParam(): void {
    this.router.navigate([], { queryParams: this.getQueryParam(), queryParamsHandling: 'merge' });
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
    this.currencyList();
    this.countPaginationApi();
  }

}