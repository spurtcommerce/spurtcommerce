/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderstatusSandbox } from '../../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';
import { OrderstatusApiClientService } from '../../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus-ApiClientService';

@Component({
  selector: 'app-spurt-orderstatus-add',
  templateUrl: './add.component.html',
  styles: [`
  .settings-right-wrapper {
    margin-top: 0px !important;
}`]
})
export class OrderStatusAddComponent implements OnInit {
  // Variable
  public updatetitle: number;
  private EditOrderStatusId: string;
  public submitted = false;
  public orderstatusinfo: any = [];
  public colorRequire: boolean;

  // FormGroup Variable

  public orderstatusform: FormGroup;
  public orderstatusName: FormControl;
  public status: FormControl;
  public colorcode: FormControl;

  // Color Picker
  public color = '';

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    public appSandbox: OrderstatusSandbox,
    private router: Router,
    public service: OrderstatusApiClientService
  ) {}

  // initially calls initForm,editOrderStatusList
  ngOnInit() {
    this.colorRequire = false;
    this.orderstatusName = null;
    this.status = null;
    this.initForm();
    this.EditOrderStatusId = this.route.snapshot.paramMap.get('id');
    this.editOrderStatusList();
  }

  // reactive form
  initForm() {
    this.orderstatusName = new FormControl('', [Validators.required]);
    this.status = new FormControl('', [Validators.required]);
    this.colorcode = new FormControl('', [Validators.required]);
    this.orderstatusform = this.fb.group({
      orderstatusName: this.orderstatusName,
      status: this.status,
      colorcode: this.colorcode
    });
  }

  // navigate to order status component
  Addordstatuscancel() {
    this.orderstatusinfo = null;
    this.orderstatusinfo = ' ';
    this.router.navigate(['/settings/local/order-status']);
  }

  /**
   * Handles form 'submit' event. Calls sandbox OrderStatus updateOrderstatus and addorderstatus function if form is valid.
   *
   * @param orderstatusform entire form value
   * @param params storing entire value
   */

  onSubmit() {
    this.submitted = true;
    if (this.color === '' || this.color === null) {
      this.colorRequire = true;
      return;
    }
    if (this.orderstatusform.invalid) {
      return;
    }
    if (this.orderstatusform.value.orderstatusName !== '') {
      const params: any = {};
      params.name = this.orderstatusform.value.orderstatusName;
      params.status = this.orderstatusform.value.status;
      params.colorcode = this.orderstatusform.value.colorcode;
      if (this.orderstatusinfo[0] && this.orderstatusinfo[0].orderStatusId) {
        params.orderStatusId = this.orderstatusinfo[0].orderStatusId;
        this.appSandbox.updateOrderStatus(params);
      } else {
        this.appSandbox.addOrderStatus(params);
      }
    }
  }

  // Edit OrderStatus Bind Values in FormControl
  editOrderStatusList() {
    this.orderstatusinfo.push(this.service.orderstatusgetdata());
    if (this.orderstatusinfo[0] !== null) {
      if (this.orderstatusinfo[0] && this.orderstatusinfo[0].name) {
        this.updatetitle = 1;
        this.orderstatusform.controls['orderstatusName'].setValue(
          this.orderstatusinfo[0].name
        );
        this.orderstatusform.controls['status'].setValue(
          this.orderstatusinfo[0].isActive
        );
        this.color = this.orderstatusinfo[0].colorCode;
        this.colorcode = this.orderstatusinfo[0].colorCode;
      }
    } else {
      this.orderstatusinfo = null;
    }
  }

  // Validation Function
  get f() {
    return this.orderstatusform.controls;
  }

  //
  onchange(a) {
    this.colorRequire = false;
    this.colorcode = a;
  }
}
