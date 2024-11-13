/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// angular common 
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

// thirdparty resorces  
import { Subscription } from 'rxjs';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

// Sandbox and services 
import { UserSandbox } from '../../../../../../../../../core/admin/settings/user/user.sandbox';
import { UserService } from '../../../../../../../../../core/admin/settings/user/user.service';

// component 
import { UserAddComponent } from '../add/add.component';
import { DeleteConfirmationDialogComponent } from 'src/theme/default/admin/shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';

// constant 
import { badgeStatusMappings, customTable, filterFields, removeEmptyKeys } from './list.constant';
import { getFormControlsFieldsObj, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-settings-user-list',
  templateUrl: './list.component.html',
  styles: [
    `
      
    `
  ]
})
export class UserListComponent implements OnInit, OnDestroy {

  @ViewChild('myDropdown') myDropdown!: NgbDropdown;
  @ViewChild("myInput") myInput: ElementRef;

  dynamicColumnFields: any = structuredClone(customTable);

  // Status Badge
  badgeStatusMappings = badgeStatusMappings;
  offset = 0
  public currentPage = 1;
  public keyword = '';
  public userdetails: any = {};
  public pageSize = '5';
  public id: any = '';
  public type: any = 'edit';
  private pagination = 1;
  public addnewuser = false;
  private subscriptions = new Subscription();
  public index: any;
  // Search filter
  private filterSearch: any = {};

  // Reusable form 
  dynamicObjControls: any = {};
  backupFormValue: any = {};
  private formObjFormGroup: any;
  private formValueExists = false;


  // Common
  _Object = Object;
  empty = [null, '', undefined];

  //Pagination 
  limit: number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;

  // Arrow functions
  trackByIndex = (index: number): number => index;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public sandbox: UserSandbox,
    private fb: UntypedFormBuilder,
    public service: UserService,
    private toastr: ToastrService,
    public translate: TranslateService,
    private modalService: NgbModal,
    public titleService: Title
  ) {
    this.titleService.setTitle('Settings | Access and permission');
  }

  ngOnInit() {
    this.buildForm();
    /*query param route value*/
    this.routeSubscribe()

    this.regSubscribeEvents();

  }
  /*Table Actions*/
  buttonAction(e: any): void {
    switch (e.key) {
      case "threeDotMenu":
        if (e.actionType == "Delete") {
          this.deleteUser(e?.userId)
        } else if (e.actionType == "Edit") {
          this.addNewUser(e, 'Edit')
        } else if (e.actionType == 'permission') {
          this.goToPermission(e)
        }
        break;

    }
  }

 


  addNewUser(data, type) {
    this.userdetails = null;
    this.service.setdata(this.userdetails);
    const modalRef2 = this.modalService.open(UserAddComponent, {
      windowClass: 'add-local', backdrop: 'static', centered: false, animation: false,
    });
    if (type === 'Edit') {
      this.userdetails = data;
      this.service.setdata(this.userdetails);
      modalRef2.componentInstance.edit = this.type;
      modalRef2.componentInstance.id = data;
    }
    modalRef2.result.then(result => {
      if (result === 'remove') {
        this.routeSubscribe();
      }
    });
  }

  focusInput() {
    this.myInput.nativeElement.focus();
  }

  keywordchange(event) {
    this.filterSearch.keyword = event;
  }

  removeFilter(remove): void {
    this.formObjFormGroup.controls[remove.key].reset();
    this.filterValueUpdate();
    this.resetAll();
  }
  /**calls getUserList @param event from material paginator
   * */
  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    this.getUserList();

  }


  /**
   * Handles form 'delete' event. Calls sandbox delete the perticular country.
   *
   */


  regSubscribeEvents() {
    this.subscriptions.add(
      this.sandbox.userDelate$.subscribe(_delete => {
        if (_delete && _delete.status === 1) {
          this.getUserList();
        }
      })
    );
  }
  // Filters
  applyFilter(): void {
    this.filterValueUpdate();
    this.resetAll();
  }

  searchList(): void {
    if (this.keyword) {
      this.index = 1;
      this.filterSearch.keyword = this.keyword;
      this.getUserList();
    } else {
      this.getUserList();
    }
  }

  //Filter Value Update
  private filterValueUpdate(): void {
    this.backupFormValue = structuredClone(this.formObjFormGroup?.value);
    this.formValueExists = Object.values(this.backupFormValue).some((val: any) => !this.empty.includes(val));

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



  private deleteUser(userId) {

    const modelRef = this.modalService.open(DeleteConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', modalDialogClass: 'modal-dialog-centered', backdropClass: 'createcr'
    });
    modelRef.componentInstance.key = '';
    modelRef.componentInstance.id = '';
    modelRef.componentInstance.deleteMessage = 'User';
    modelRef.result.then((result) => {
      if (result === 'deleted') {
        const param: any = {};
        param.id = userId;
        this.sandbox.deleteUser(param);
        this.sandbox.userDelate$.subscribe(_delete => {
          if (_delete) {
            if (_delete['status'] === 1) {
              this.getUserList();
            }
          }
        });
      }
    });
  }


  // USER LIST
  private getUserList() {
    this.offset = (this.currentPage - 1) * this.limit;
    let param = removeEmptyKeys(this.getQueryParam());
    param.count = false;

    this.sandbox.getUserList(param);
    if (this.pagination) {
      param.count = true;
      this.sandbox.getUserPagination(param);
    }
    this.updateQueryParam()
  }

  private goToPermission(user) {
    const userDetail = JSON.parse(sessionStorage.getItem('adminUserdetail'))
      .userdetails;
    if (userDetail.userId === user.userId) {
      this.toastr.error('You cannot set permission for current logged in user');
      return;
    }
    const details = { id: user.userId, name: user.firstName + ' ' + user.lastName, type: 'user', role: user.usergroup.name };
    this.router.navigate(['/settings/access-and-permission/permission'], { queryParams: { user: JSON.stringify(details) } });
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
    this.getUserList();

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}
