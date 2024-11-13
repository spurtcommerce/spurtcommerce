/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

// angular imports 
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Validators,
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormBuilder
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// Sandbox 
import { OrderstatusSandbox } from '../../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';
// Services 
import { OrderstatusApiClientService } from '../../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus-ApiClientService';

@Component({
  selector: 'app-spurt-orderstatus-add1',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  styles: [`
  .settings-right-wrapper {
    margin-top: 0px !important;
}`]
})
export class OrderStatusAddComponent implements OnInit {
  // List 
  public pageSize = '5';
  public updatetitle: number;
  private editOrderStatusId: string;
  // validation 
  public submitted = false;
  public orderStatusInfo: any = [];
  public colorRequire: boolean;
  // Form 
  public orderStatusForm: UntypedFormGroup;
  public orderstatusName: UntypedFormControl;
  public priority: UntypedFormControl;
  public status: UntypedFormControl;
  public colorCode: UntypedFormControl;
  public color = '';
  // Pagination 
  private pagenationCount = true;
  private keyword = '';
  private offset: number;

  constructor(
    public modalService: NgbActiveModal,
    public fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    public appSandbox: OrderstatusSandbox,
    private router: Router,
    public service: OrderstatusApiClientService
  ) { }

  ngOnInit() {
    this.colorRequire = false;
    this.orderstatusName = null;
    this.status = null;
    this.initForm();
    this.editOrderStatusId = this.route.snapshot.paramMap.get('id');
    this.editOrderStatusList();
  }

 

  initForm() {
    this.orderstatusName = new UntypedFormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(32)
    ]));
    this.priority = new UntypedFormControl('', [Validators.required]);
    this.status = new UntypedFormControl(null, [Validators.required]);
    this.colorCode = new UntypedFormControl('', [Validators.required]);
    this.orderStatusForm = this.fb.group({
      orderstatusName: this.orderstatusName,
      priority: this.priority,
      status: this.status,
      colorCode: this.colorCode
    });
  }
  close() {
    this.modalService.close('close');

  }
  cancel() {
    this.orderStatusInfo = null;
    this.orderStatusInfo = ' ';
    this.router.navigate(['/settings/local/order-status']);
  }

  /**
   * Handles form 'submit' event. Calls sandbox OrderStatus updateOrderstatus and addorderstatus function if form is valid.
   *
   * @param orderStatusForm entire form value
   * @param params storing entire value
   */

  onSubmit() {
    this.submitted = true;
    if (this.color === '' || this.color === null) {
      this.colorRequire = true;
      return;
    }
    if (this.orderStatusForm.invalid) {
      return;
    }
    if (this.orderStatusForm.value.orderstatusName !== '') {
      const params: any = {};
      params.name = this.orderStatusForm.value.orderstatusName;
      params.status = this.orderStatusForm.value.status;
      params.colorcode = this.orderStatusForm.value.colorCode;
      params.priority = this.orderStatusForm.value.priority;
      if (this.orderStatusInfo[0] && this.orderStatusInfo[0].orderStatusId) {
        params.orderStatusId = this.orderStatusInfo[0].orderStatusId;
        this.appSandbox.updateOrderStatus(params);
        this.orderStatusList(this.offset, this.keyword);
      } else {
        this.appSandbox.addOrderStatus(params);
        this.orderStatusList(this.offset, this.keyword);
      }
    }
    this.modalService.close('close');
  }
  orderStatusList(offset: number = 0, keyword) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    params.status = '';
    this.appSandbox.orderStatusList(params);

    if (this.pagenationCount) {
      params.count = true;
      this.appSandbox.orderStatusListCount(params);
    }
  }

  // Edit OrderStatus Bind Values in FormControl
  editOrderStatusList() {
    this.orderStatusInfo.push(this.service.orderstatusgetdata());
    if (this.orderStatusInfo[0] !== null) {
      if (this.orderStatusInfo[0] && this.orderStatusInfo[0].name) {
        this.updatetitle = 1;
        this.orderStatusForm.controls['orderstatusName'].setValue(
          this.orderStatusInfo[0].name
        );
        this.orderStatusForm.controls['priority'].setValue(
          this.orderStatusInfo[0].priority
        );
        this.orderStatusForm.controls['status'].setValue(
          this.orderStatusInfo[0].isActive
        );
        this.color = this.orderStatusInfo[0].colorCode;
        this.colorCode = this.orderStatusInfo[0].colorCode;
      }
    } else {
      this.orderStatusInfo = null;
    }
  }

  // Validation Function
  get f() {
    return this.orderStatusForm.controls;
  }

  //
  onchange(a) {
    this.colorRequire = false;
    this.colorCode = a;
  }
}
