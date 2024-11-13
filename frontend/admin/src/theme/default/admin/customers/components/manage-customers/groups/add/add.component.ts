/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import {
  Validators,
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormBuilder
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomersGroupSandbox } from '../../../../../../../../core/admin/Customers/customers-group/customers-group.sandbox';
import { CustomersGroupService } from '../../../../../../../../core/admin/Customers/customers-group/customers-group.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spurt-customer-group-add',
  templateUrl: './add.component.html',
  styleUrls: ['add.component.scss']
})
export class GroupsAddComponent implements OnInit {

  public updateTitle: number;
  private editOrderStatusId: string;
  public submitted = false;
  public orderStatusInfo: any = [];
  public colorRequire: boolean;
  // FormGroup Variable
  public customerGroupForm: UntypedFormGroup;
  public name: UntypedFormControl;
  public description: UntypedFormControl;
  public status: UntypedFormControl;
  public colorCode: UntypedFormControl;
  public id: number;
  public color = '';
  public queryDetails: any = {};
  private subscriptions: Array<Subscription> = [];

 

  public noWhitespaceValidator(control: UntypedFormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  constructor(
    public fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    public appSandbox: CustomersGroupSandbox,
    private router: Router,
    public service: CustomersGroupService
  ) {
    const offset = this.route.snapshot.queryParamMap.get('offset');
    const index = this.route.snapshot.queryParamMap.get('index');
    this.queryDetails.offset = offset || 0;
    this.queryDetails.index = index || 0;
  }


  ngOnInit() {
    // this.colorRequire = false;
    // this.name = null;
    // this.description = null;
    // this.status = null;
    this.initForm();
    this.editOrderStatusList();
    this.customersGroupList();

    this.editOrderStatusId = this.route.snapshot.paramMap.get('id');
  }

  customersGroupList() {
    const param: any = {};
    param.limit = 0;
    param.offset = 0;
    param.keyword = '';
    param.count = '';
    param.status = 1;
    this.appSandbox.customersGroupList(param);
    // this.appSandbox.getCustomersGroupList$.subscribe(

    // )
  }

  initForm() {
    const nameValidationPattern = '[a-zA-Z \'-]*';

    this.name = new UntypedFormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(30),
      Validators.pattern(nameValidationPattern),
      this.noWhitespaceValidator

    ]));
    this.description = new UntypedFormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(225),
      this.noWhitespaceValidator
    ]));
    this.status = new UntypedFormControl(null, [Validators.required]);
    this.colorCode = new UntypedFormControl('', [Validators.required]);
    this.customerGroupForm = this.fb.group({
      name: this.name,
      description: this.description,
      status: this.status,
      colorCode: this.colorCode
    });
  }

  backToList() {
    // this.orderStatusInfo = null;
    // this.orderStatusInfo = '';
    this.router.navigate(['/customers/manage-customers/groups/list'], { queryParams: this.queryDetails });
  }

  onSubmit() {
    this.submitted = true;
    if (this.color === '' || this.color === null) {
      this.colorRequire = true;
      return;
    }
    if (this.customerGroupForm.invalid) {
      return;
    }
    if (this.customerGroupForm.value.name !== '') {
      const params: any = {};
      params.name = this.customerGroupForm.value.name;
      params.description = this.customerGroupForm.value.description;
      params.status = this.customerGroupForm.value.status.toString();
      params.colorcode = this.customerGroupForm.value.colorCode;
      if (this.orderStatusInfo[0] && this.orderStatusInfo[0].id) {
        params.id = this.orderStatusInfo[0].id;
        this.appSandbox.updateCustomersGroup(params);
      } else {
        this.appSandbox.addCustomersGroup(params);
      }
    }
    this.subscripe();
  }

  subscripe() {
    this.subscriptions.push(
      this.appSandbox.getNewCustomersGroup$.subscribe(data => {
        if (data) {
          this.router.navigate(['/customers/manage-customers/groups/list'], { queryParams: this.queryDetails });
        }
      })
    );
    this.subscriptions.push(
      this.appSandbox.getUpdateCustomersGroup$.subscribe(data => {
        if (data) {
          // this.orderStatusInfo = data;
          this.router.navigate(['/customers/manage-customers/groups/list'], { queryParams: this.queryDetails });
        }
      })
    );
  }

  editOrderStatusList() {
    this.orderStatusInfo.push(this.service.getOrderStatus());
    console.log(this.orderStatusInfo, 'orderStatusInfo')
    if (this.orderStatusInfo[0] !== null) {
      if (this.orderStatusInfo[0] && this.orderStatusInfo[0].name) {
        this.updateTitle = 1;
        this.customerGroupForm.controls['name'].setValue(
          this.orderStatusInfo[0].name
        );
        this.customerGroupForm.controls['description'].setValue(
          this.orderStatusInfo[0].description
        );
        this.customerGroupForm.controls['status'].setValue(
          this.orderStatusInfo[0].isActive
        );
        this.color = this.orderStatusInfo[0].colorCode;
        this.colorCode = this.orderStatusInfo[0].colorCode;
      }
    } else {
      this.orderStatusInfo = null;
    }
  }

  get f() {
    return this.customerGroupForm.controls;
  }

  onchange(a) {
    this.colorRequire = false;
    this.colorCode = a;
  }
}
