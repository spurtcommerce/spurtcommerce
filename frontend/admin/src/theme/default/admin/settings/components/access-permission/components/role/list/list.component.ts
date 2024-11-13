/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// angular imports 
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Sandbox and services 
import { RoleSandbox } from '../../../../../../../../../core/admin/settings/role/role.sandbox';
import { RoleApiClientService } from '../../../../../../../../../core/admin/settings/role/role.ApiClientService';
// Third party imports 
import { Subscription } from 'rxjs';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
//Component 
import { RoleAddComponent } from '../add/add.component';
import { DeleteConfirmationDialogComponent } from 'src/theme/default/admin/shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
// Constant 
import { badgeStatusMappings, customTable, filterFields, removeEmptyKeys } from './list.constant';
import { getFormControlsFieldsObj, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';
import { UntypedFormBuilder } from '@angular/forms';
@Component({
  selector: 'app-settings-role-list',
  templateUrl: './list.component.html',
  styles: [
    `
      .settings-right-wrapper {
        margin-top: 0px !important;
      }

      .setting1-inner-header {
        margin-top: 40px !important;
      }
      .coc{
        background: #f20a6d;
    border: solid thin #dddddd;
    color: white;
    padding: 4px 16px;
    }
    `
  ]
})
export class RoleListComponent implements OnInit, OnDestroy {
  // Decorator 
  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild("myInput") myInput: ElementRef;

  // Common
  _Object = Object;
  empty = [null, '', undefined];

  // CustomTable 
  dynamicColumnFields: any = structuredClone(customTable);

  // subscriptions
  private subscriptions: Subscription = new Subscription();


  // Status Badge
  badgeStatusMappings = badgeStatusMappings;
  public roledetails: any = {};
  public pageSize = '10';
  public keyword = '';
  private offset: number;
  public currentPage = 1;
  filterSearch: any = {};

  public type = 'edit';

  // Reusable form 
  dynamicObjControls: any = {};
  backupFormValue: any = {};
  private formObjFormGroup: any;
  private formValueExists = false;
  //Pagination 
  limit: number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;

  // Arrow functions
  trackByIndex = (index: number): number => index;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder,
    public appSandbox: RoleSandbox,
    public service: RoleApiClientService,
    public modalService: NgbModal,
    public titleService: Title
  ) {
    this.titleService.setTitle('Settings | Access and permission');
    this.regSubscribeEvents();
  }

  ngOnInit() {
    //build Form
    this.buildForm()
    // intialize and param data getter 
    this.routeSubscribe();
  }

  /*Table Actions*/
  buttonAction(e: any): void {
    switch (e.key) {
      case "threeDotMenu":
        if (e.actionType == "Delete") {
          this.deleteRole(e?.groupId)
        } else if (e.actionType == "Edit") {
          this.addNewRole(e, 'Edit')
        }
        else if (e.actionType == 'role') {
            this.goToPermission(e)
        }
        break;
    }
  }

  //Add role
  addNewRole(data, type) {
    this.roledetails = null;
    this.service.rolesetdata(this.roledetails);
    const modalRef2 = this.modalService.open(RoleAddComponent, {
      windowClass: 'add-local', backdrop: 'static', centered: false, animation: false,
    });
    if (type === 'Edit') {
      this.roledetails = data;
      this.service.rolesetdata(this.roledetails);

      modalRef2.componentInstance.edit = this.type;
      modalRef2.componentInstance.id = data;
    }
    modalRef2.result.then(result => {
      if (result === 'close') {

      }
    });
  }

  /**
   * Handles form 'list' event. Calls sandbox Role getRolelist function .
   *
   * @param params storing entire value
   */
  getRolelist() {
    this.offset = (this.currentPage - 1) * this.limit;
    let param = removeEmptyKeys(this.getQueryParam());
    param.count = false;

    this.appSandbox.getRoleList(param);
    this.updateQueryParam()
  }



  /**
   * Handles form 'list' event. Calls sandbox Role getRolelistCount function .
   *
   * @param params storing entire value
   */



  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.getRolelist();

  }

  goToPermission(user) {
    const userDetail = JSON.parse(sessionStorage.getItem('adminUserdetail'))
      .userdetails;
    const details = { id: user.groupId, type: 'role', role: user.name };
    this.router.navigate(['/settings/access-and-permission/permission'], { queryParams: { user: JSON.stringify(details) } });
  }

  /**
   * Handles form 'delete' event. Calls sandbox delete the perticular role.
   *
   */
  deleteRole(Id) {
    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.componentInstance.deleteMessage = 'Role';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        const param: any = {};
        param.groupId = Id;
        this.appSandbox.deleteRole(param);
        this.appSandbox.roleDelete$.subscribe(_delete => {
          if (_delete) {
            if (_delete['status'] === 1) {
              this.getRolelist();
              this.getRoleListCount();
            }
          }
        });
      }
    });
  }

  searchList(): void {
    if (this.keyword) {
      this.filterSearch.keyword = this.keyword;
      this.getRolelist();
      this.getRoleListCount();
    } else {
      this.getRolelist();
      this.getRoleListCount();
    }
  }


  keywordchange(event) {
    this.filterSearch.keyword = event;
  }
  //getRoleList Count
  private getRoleListCount() {
    this.offset = (this.currentPage - 1) * this.limit;
    let param = removeEmptyKeys(this.getQueryParam());
    param.count = true;
    this.appSandbox.getpagination(param);
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
    this.getRoleListCount();
    this.dropDownClose('myDropdown');
  }

  // Filters
  applyFilter(): void {
    this.filterValueUpdate();
    this.resetAll();
  }

  removeFilter(remove): void {
    this.formObjFormGroup.controls[remove.key].reset();
    this.filterValueUpdate();
    this.resetAll();
  }

  // intialize form
  private buildForm(): void {
    const formObjModel = filterFields;
    const formGroupField = getFormControlsFieldsObj(formObjModel);
    this.formObjFormGroup = this.fb.group(formGroupField);
    Object.keys(formObjModel).forEach((element: any) => {
      this.dynamicObjControls[element] = getTypes(formObjModel[element], this.formObjFormGroup);
    });
    this.filterValueUpdate();
  }

  //Filter Value Update
  private filterValueUpdate(): void {
    this.backupFormValue = structuredClone(this.formObjFormGroup?.value);
    this.formValueExists = Object.values(this.backupFormValue).some((val: any) => !this.empty.includes(val));
  }

  // delete event , subscripe status
  private regSubscribeEvents() {
    this.subscriptions.add(
      this.appSandbox.roleDelete$.subscribe(_delete => {
        if (_delete && _delete.status === 1) {
          this.getRolelist();
        }
      })
    );
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
      this.limit = paramsValue.limit ? Number(paramsValue.limit) : this.limit;
      this.offset = paramsValue.offset ? Number(paramsValue.offset) : 0;
      this.currentPage = (paramsValue.offset && paramsValue.limit) ? Math.floor(paramsValue.offset / paramsValue.limit) + 1 : 1;
      this.formObjFormGroup.patchValue({
        'search': paramsValue.keyword ?? ""
      });
      this.filterValueUpdate();
    }));
    this.getRolelist();
    this.getRoleListCount();

    this.appSandbox.roleUpdateLoaded$.subscribe(data => {
      if (data === true) {
        this.getRolelist();
        this.getRoleListCount();
      }
    });

    this.appSandbox.roleAddLoaded$.subscribe(data => {
      if (data === true) {
        this.getRolelist();
        this.getRoleListCount();
      }
    });
  }

  //unsubscribing
  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}