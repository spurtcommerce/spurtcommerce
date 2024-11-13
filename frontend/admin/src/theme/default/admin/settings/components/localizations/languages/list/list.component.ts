/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
//angular imports 
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

//sandbox and services
import { LanguagesService } from '../../../../../../../../core/admin/settings/localizations/languages/languages.service';
import { LanguagesSandbox } from '../../../../../../../../core/admin/settings/localizations/languages/languages.sandbox';
//component
import { LanguageAddComponent } from '../add/add.component';
//third party 
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmationDialogComponent } from '../../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
//constant
import { customTable, badgeStatusMappings, removeEmptyKeys, filterFields } from './list.constant';
import { getFormControlsFields, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';
import { UntypedFormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings-language-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class LanguageListComponent implements OnInit {
  // Decorators 
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild("myInput") myInput: ElementRef;

  //dynamicColumnFields
  dynamicColumnFields: any = structuredClone(customTable);

  //pagination related 
  public currentPage: number = 1;
  private pagenationcount = true;
  public index: number;


  // Common
  _Object = Object;
  empty = [null, '', undefined];


  // Reusable form 
  dynamicObjControls: any = {};
  backupFormValue: any = {};
  private formObjFormGroup: any;
  private formValueExists = false;
  // filter 
  public keyword = '';
  public type = 'edit';

  //badgeStatusMappings
  badgeStatusMappings = badgeStatusMappings
  // filter 
  public filterSearch: any = {};
  // list related  
  private offset: number;
  private languageinfodetails: any = [];
  // subscriptions
  private subscriptions: Subscription = new Subscription();

  //Pagination 
  limit: number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;

  // Arrow functions
  trackByIndex = (index: number): number => index;

  constructor(
    public modal: NgbModal,
    public languageSandbox: LanguagesSandbox,
    public router: Router,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    public service: LanguagesService,
    public titleService: Title
  ) {
    this.titleService.setTitle('Settings | Localization');
  }

  ngOnInit() {
    //build form
    this.buildForm();
    //routeSubscribe
    this.routeSubscribe()
  }

  // Filters
  applyFilter(): void {
    this.filterValueUpdate();
    this.resetAll();
  }



  //languageList
  languageList() {

    this.offset = (this.currentPage - 1) * this.limit;
    let param = removeEmptyKeys(this.getQueryParam());
    param.count = false;
    this.languageSandbox.languageList(param);
    if (this.pagenationcount) {
      param.count = 'true';
      this.languageSandbox.languageListPagination(param);
    }
    this.updateQueryParam();

  }
  /*Table Actions*/
  buttonAction(e: any): void {
    switch (e.key) {
      case "threeDotMenu":
        if (e.actionType == "Delete") {
          console.log(e)
          this.deleteLanguage(e?.languageId)
        } else if (e.actionType == "Edit") {
          this.addLanguage(e, 'Edit')
        }
        break;

    }
  }
  //AddLanguage
  addLanguage(data, type) {
    const modalRef = this.modal.open(LanguageAddComponent, {
      windowClass: 'add-local', keyboard: false, backdrop: 'static', animation: false,
    });
    if (type === 'Edit') {
      this.service.languageSetData(data);
      modalRef.componentInstance.edit = this.type;
      modalRef.componentInstance.id = data.languageId;
    } else {
      this.service.languageSetData('');
    }
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

  //Filter Value Update
  private filterValueUpdate(): void {
    this.backupFormValue = structuredClone(this.formObjFormGroup?.value);
    this.formValueExists = Object.values(this.backupFormValue).some((val: any) => !this.empty.includes(val));

  }

  //editLanguage
  editLanguage(languageinfo) {
    this.languageinfodetails = languageinfo;
    this.service.languageSetData(this.languageinfodetails);
    this.router.navigate([
      '/settings/local/language/edit',
      this.languageinfodetails.languageId
    ]);
  }
  //deleteLanguage
  deleteLanguage(languageId) {
    const modelRef = this.modal.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.componentInstance.deleteMessage = 'Language';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.languageSandbox.deleteLanguage({ languageId: languageId });
        this.regSubscribeEvents();
      }
    });
  }
  //onPageChange
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.languageList();
  }

  //searchList
  searchList(): void {
    if (this.keyword) {
      this.index = 1;
      this.filterSearch.keyword = this.keyword;
      this.languageList()
    } else {
      this.languageList()
    }
  }
  //FocusInput
  focusInput() {
    this.myInput.nativeElement.focus();
  }
  //KeywordChange
  keywordchange(event) {
    this.filterSearch.keyword = event;
  }
  //removeFilter
  removeFilter(remove): void {
    this.formObjFormGroup.controls[remove.key].reset();
    this.filterValueUpdate();
    this.resetAll();
  }


  //regSubscribeEvents
  private regSubscribeEvents() {
    this.languageSandbox.languageDelete$.subscribe(_delete => {
      if (_delete && _delete.status === 1) {
        this.languageList();
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
  // Query param route value subscribe
  private routeSubscribe(): void {
    let paramsValue: any = {};
    this.subscriptions.add(this.route.queryParams.subscribe(params => {
      paramsValue = params;
      this.offset = paramsValue.offset ? Number(paramsValue.offset) : 0;
      this.formObjFormGroup.patchValue({
        'search': paramsValue.keyword ?? ""
      });
      this.filterValueUpdate();
    }));
    this.languageList();

    this.languageSandbox.languageAddLoaded$.subscribe(data => {
      if (data === true) {
        this.languageList();
      }
    });

    this.languageSandbox.languageUpdateLoaded$.subscribe(data => {
      if (data === true) {
        this.languageList();
      }
    });
  }

}
