/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

// angular common 
import { Component, ViewEncapsulation, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//Sandbox and service
import { RoleSandbox } from '../../../../../../../../../core/admin/settings/role/role.sandbox';
import { RoleApiClientService } from '../../../../../../../../../core/admin/settings/role/role.ApiClientService';
import { formFields } from './add.constant';
import {  getFormControlsFields, getFormControlsFieldsObj, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-spurt-settings-role-add',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'add.component.html',
  styles: [
    ``]
})
export class RoleAddComponent implements OnInit {
  //  decorators 
  @Input() edit: any;
  @Input() id: any;

   // Reusable form
   _Object = Object;
   dynamicObjControls: any = {};
   private formObjFormGroup: UntypedFormGroup;

   //Form Controls
  public roleName: UntypedFormControl;
  public isActive: UntypedFormControl;
  public roleInfo: any = [];
  // Validation 
  public submitted = false;
  public value: any;
  private isChecked: boolean;
  // List 
  private editRoleId: string;
  // pagination 
  public pageSize = '10';
  private keyword = '';
  private offset: number;
  public currentPage = 1;

  // Arrow functions
  trackByIndex = (index: number): number => index;

 //Pagination 
  limit: number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;

  constructor(
    public fb: UntypedFormBuilder,
    public appSandbox: RoleSandbox,
    private route: ActivatedRoute,
    private router: Router,
    private ref:ChangeDetectorRef,
    public service: RoleApiClientService,
    public modalService: NgbActiveModal,
  ) { }

  ngOnInit() {
    // build Form 
    this.buildForm()
    //intialize funtion
    this.intializeFunction()
  }

  
  private getRolelist() {
    this.offset = (this.currentPage - 1) * this.limit;
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    params.keyword = this.keyword;
    this.appSandbox.getRoleList(params);
  }

  getRoleListCount(offset: number = 0, pageSize) {
    const params: any = {};
    params.limit = pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    params.count = true;
    this.appSandbox.getpagination(params);
  }

  cancel() {
    this.roleInfo = null;
    this.roleInfo = ' ';
    this.modalService.close('close');
  }

  onChangestatus(evt) {
    this.isChecked = evt.target.checked;
    if (this.isChecked == true) {
      this.value = 1;
    } else if (this.isChecked == false) {
      this.value = 0;
    }
  }

  /**
   * Handles form 'submit' event. Calls sandbox Role updateRole and addRole function if form is valid.
   *
   * @param params storing entire value
   */
  onSubmit() {
    this.submitted = true;

    if (this.formObjFormGroup.invalid) {
      return;
    }

    if (this.formObjFormGroup.value.name !== '') {
      const params: any = {};
      params.name = this.formObjFormGroup.value.roleName;
      params.status = this.formObjFormGroup.value.isActive ?? 0;
      if (this.roleInfo && this.roleInfo[0] && this.roleInfo[0].groupId) {
        params.groupId = this.roleInfo[0].groupId;
        params.status = this.formObjFormGroup.value.isActive ?? 0;
        this.appSandbox.updateRole(params);
        this.modalService.close('close');
      } else {
        this.appSandbox.addRole(params);
        this.modalService.close('close');
      }
    }
 
  }

  close() {
    this.modalService.close('close');
  }

  editRoleList() {
    this.roleInfo.push(this.service.rolegetdata());
    if (this.roleInfo[0] !== null) {

      if (this.roleInfo[0] && this.roleInfo[0].name) {

          if (this.edit === 'edit') {
            setTimeout(() => {
              
              this.formObjFormGroup.controls['roleName'].setValue(this.roleInfo[0].name)
           this.formObjFormGroup.controls['isActive'].setValue(this.roleInfo[0].isActive)
            }, 100);
            // this.ref.detectChanges()

          }
      }
    } else {
      this.formObjFormGroup.patchValue({
        roleName: null,
        isActive: null,
        
      });
      this.roleInfo = null;
    }
  }

 

  // Intialize form
  private buildForm(): void {
    const formObjModel = formFields;
    const formGroupField = getFormControlsFieldsObj(formObjModel);
    this.formObjFormGroup = this.fb.group(formGroupField);
    Object.keys(formObjModel).forEach((element: any) => {
      this.dynamicObjControls[element] = getTypes(formObjModel[element], this.formObjFormGroup);
    });
  }

  private intializeFunction() {
    this.roleName = null;
    this.isActive = null;
    this.editRoleId = this.route.snapshot.paramMap.get('id');
    this.getRolelist()
    this.editRoleList();
  }
}
