/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// Angular imports
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser'

// Third Party imports
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// Sandbox
import { CountrySandbox } from '../../../../../../../../core/admin/settings/localizations/country/country.sandbox';
import { CountryService } from '../../../../../../../../core/admin/settings/localizations/country/country.service';

// Constants
import { badgeStatusMappings, customTable, filterFields, removeEmptyKeys } from './list.constant';

// Model
import { DeleteConfirmationDialogComponent } from '../../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { CountriesAddComponent } from '../add/add.component';
import { getFormControlsFields, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-country-list',
  templateUrl: 'list.component.html',
  styles: [`
  .settings-right-wrapper {
    margin-top: 0px !important;
}.coc{
  background: #f20a6d;
    border: solid thin #dddddd;
    color: white;
    padding: 4px 16px;
}`]
})
export class CountriesListComponent implements OnInit {
  // Decorators 
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild("myInput") myInput: ElementRef;

  // custom table intialized 
  dynamicColumnFields: any = structuredClone(customTable);

  // Status Badge
  badgeStatusMappings = badgeStatusMappings;

  // Common
  _Object = Object;
  empty = [null, '', undefined];

  // subscriptions
  private subscriptions: Subscription = new Subscription();

  // Reusable form 
  dynamicObjControls: any = {};
  backupFormValue: any = {};
  private formObjFormGroup: any;
  private formValueExists = false;
  // list 
  public currentPage: number = 1;
  filterSearch: any = {};
  public type = 'edit';
  public keyword = '';
  public id = '';
  public offset: number;
  public page: any;
  public index: number;

  //Pagination 
  limit: number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;

  // Arrow functions
  trackByIndex = (index: number): number => index;

  constructor(
    public modal: NgbModal,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public countrySandbox: CountrySandbox,
    public service: CountryService,
    public titleService: Title
  ) {
    this.titleService.setTitle('Settings | Localization');
  }
  //Life Cycle hook
  ngOnInit() {
    //build Form
    this.buildForm()
    //subscribte Events
    this.regSubscribeEvents();
    /*query param route value*/
    this.routeSubscribe()
  }


  removeFilter(remove): void {
    this.formObjFormGroup.controls[remove.key].reset();
    this.filterValueUpdate();
    this.resetAll();
  }



  /*Table Actions*/
  buttonAction(e: any): void {
    switch (e.key) {
      case "threeDotMenu":
        if (e.actionType == "Delete") {
          this.deleteCountry(e?.countryId)
        } else if (e.actionType == "Edit") {
          this.addNewCountry(e, 'Edit')
        }
        break;

    }
  }

  
  // Filters
  applyFilter(): void {
    this.filterValueUpdate();
    this.resetAll();
  }
  // Add New Country Navigate to Add Form
  addNewCountry(data, type) {
    const modalRef = this.modal.open(CountriesAddComponent, {
      windowClass: 'add-local', keyboard: false, backdrop: 'static', animation: false,
    });
    if (type === 'Edit') {
      this.service.setcountrylistdata(data);
      modalRef.componentInstance.edit = this.type;
      modalRef.componentInstance.id = data.countryId;
    } else {
      this.service.setcountrylistdata('');
    }
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
  // Reset All
  private resetAll(): void {
    this.onPageChange({ limit: this.limit, offset: 0 });
    this.dropDownClose('myDropdown');
  }


  // Pagination event
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.getCountryList();
    this.getCountryCount();
  }

  //delete country
  deleteCountry(countryId) {
    const modelRef = this.modal.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.componentInstance.deleteMessage = 'Country';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.countrySandbox.countryDelete({ countryId: countryId });
      }
    });
  }

  focusInput() {
    this.myInput.nativeElement.focus();
  }

  keywordchange(event) {
    this.filterSearch.keyword = event;
  }

  //Filter Value Update
  private filterValueUpdate(): void {
    this.backupFormValue = structuredClone(this.formObjFormGroup?.value);
    this.formValueExists = Object.values(this.backupFormValue).some((val: any) => !this.empty.includes(val));
  }

  // list
  getCountryList(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    const param = removeEmptyKeys(this.getQueryParam());
    param.count = 0;
    this.countrySandbox.getCountriesList(param);
    this.updateQueryParam();
  }

  // Count
  getCountryCount(): void {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = true;
    this.countrySandbox.getCountryCount(params);
  }

  // delete event , subscripe status
  private regSubscribeEvents() {
    this.countrySandbox.deleteCountry$.subscribe(_delete => {
      if (_delete && _delete.status === 1) {
        this.getCountryList();
        this.getCountryCount();
      }
    });
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
      currentPage: this.currentPage,
      keyword: this.backupFormValue['search'] ?? '',
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
      this.currentPage = (paramsValue.offset && paramsValue.limit) ? Math.floor(paramsValue.offset / paramsValue.limit) + 1 : 1;
      this.formObjFormGroup.patchValue({
        'search': paramsValue.keyword ?? ""
      });
      this.filterValueUpdate();
    }));
    this.getCountryList();
    this.getCountryCount();

    this.countrySandbox.countryAddLoaded$.subscribe(data => {
      if (data === true) {
        this.getCountryList();
        this.getCountryCount();
      }
    });

    this.countrySandbox.updateCountryLoaded$.subscribe(data => {
      if (data === true) {
        this.getCountryList();
        this.getCountryCount();
      }
    });
  }
}