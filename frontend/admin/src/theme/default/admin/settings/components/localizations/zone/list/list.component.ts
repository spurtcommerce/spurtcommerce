/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// angular 
// angular common imports
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UntypedFormBuilder } from '@angular/forms';

// third party
import { NgbDropdown, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

// sandbox and service 
import { ZoneService } from '../../../../../../../../core/admin/settings/localizations/zone/zone.service';
import { ZoneSandbox } from '../../../../../../../../core/admin/settings/localizations/zone/zone.sandbox';

//component
import { DeleteConfirmationDialogComponent } from '../../../../../shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ZoneAddComponent } from './../add/add.component';

// constant
import { customTable, badgeStatusMappings, removeEmptyKeys, filterFields } from './list.constant';
import { getFormControlsFields, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';




@Component({
  selector: 'app-settings-zone-list',
  templateUrl: './list.component.html',
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
export class ZoneListComponent implements OnInit {

  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild("myInput") myInput: ElementRef;


  //dynamicColumnFields
  dynamicColumnFields: any = structuredClone(customTable);

  //badge Mappings
  badgeStatusMappings = badgeStatusMappings;

  // list 
  public type = 'edit';
  public pageSize = '5';
  public keyword = '';
  public currentPage = 1;
  public index: any;
  private popoverContent: any;

  // filterForms 
  filterSearch: any = {};
  ZoneList: any;
  private offset = 0;
  private isCount: boolean;

  // Reusable form 
  dynamicObjControls: any = {};
  backupFormValue: any = {};
  private formObjFormGroup: any;
  private formValueExists = false;

  // Common
  _Object = Object;
  empty = [null, '', undefined];

  // limit
  limit: number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;

  // subscriptions
  private subscriptions: Subscription = new Subscription();

  constructor(
    public modal: NgbModal,
    private router: Router,
    public zoneSandbox: ZoneSandbox,
    public service: ZoneService,
    public titleService: Title,
    private fb: UntypedFormBuilder,
    public route: ActivatedRoute,
  ) {
    this.titleService.setTitle('Settings | Localization');
  }

  ngOnInit() {
    // search
   this.buildForm()
    /*query param route value*/
    this.routeSubscribe()
  }


  /*Table Actions*/
  buttonAction(e: any): void {
    switch (e.key) {
      case "threeDotMenu":
        if (e.actionType == "Delete") {
          this.deleteZone(e?.zoneId)
        } else if (e.actionType == "Edit") {
          this.editZone(e)
        }
        break;

    }
  }

  // navigate to add component
  // addeNewZone(data, type) {
  //   const modalRef = this.modal.open(ZoneAddComponent, {
  //     windowClass: 'add-local', keyboard: false, backdrop: 'static', animation: false,
  //   });
  //   if (type === 'Edit') {
  //     this.service.setzonelistdata(data);
  //     modalRef.componentInstance.edit = this.type;
  //     modalRef.componentInstance.id = data.countryId;
  //   } else {
  //     this.service.setzonelistdata('');
  //   }
  // }

  editZone(data:any){
    const modalRef = this.modal.open(ZoneAddComponent, {
      windowClass: 'add-local', keyboard: false, backdrop: 'static', animation: false,
    });
    this.service.setzonelistdata(data);
    modalRef.componentInstance.edit = this.type;
    modalRef.componentInstance.id = data.countryId;
    modalRef.result.then((result) => {
      if (result == 'clear') {
        this.routeSubscribe();
          }
      });
  }


  addeNewZone(data, type) {
    const modalRef = this.modal.open(ZoneAddComponent, {
      windowClass: 'add-local', keyboard: false, backdrop: 'static', animation: false,
    });
    this.service.setzonelistdata('');
    modalRef.result.then((result) => {
      if (result == 'clear') {
        this.routeSubscribe();
          }
      });
  }


  deleteZone(zoneId) {
    const modelRef = this.modal.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.componentInstance.deleteMessage = 'Zone';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        this.zoneSandbox.zoneDelete({ zoneId: zoneId });
        this.regSubscribeEvents();
      }
    });
  }




  // list
   getZonesList(offset: number = 0) {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = false;
    this.zoneSandbox.getZoneList(params);
    this.updateQueryParam()
  }

  // count
   getZonesListCount(offset: number = 0) {
    this.offset = (this.currentPage - 1) * this.limit;
    const params = removeEmptyKeys(this.getQueryParam());
    params.count = true;
    this.zoneSandbox.getZonePagination(params);
  }


  private regSubscribeEvents() {
    this.zoneSandbox.deleteZone$.subscribe(_delete => {
      if (_delete && _delete.status === 1) {
        this.getZonesList(this.offset);
      }
    });
  }

  // Dropdown Close
  private dropDownClose(dropDownName): void {
    if (this.hasOwnProperty(dropDownName)) {
      this[dropDownName]?.close();
    }
  }

  // pagination
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.getZonesList();
  }

  // Reset All
  private resetAll(): void {
    this.onPageChange({ limit: this.limit, offset: 0 });
    this.getZonesListCount();
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
        'search': '',
      });
    }
    this.filterValueUpdate();
    this.resetAll();
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
 this.zoneSandbox.zoneUpdateLoaded$.subscribe((val:any) => {
      if (val?.status == 1) {
        this.getZonesList();
        this.getZonesListCount();
       
      }
    })
    this.getZonesList();
    this.getZonesListCount();
  }
}