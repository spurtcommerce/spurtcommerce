/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs/index';
import { OrderstatusSandbox } from '../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';
import { PersonalizeOrderSandbox } from '../../../../../../../core/admin/settings/personalize/order/order-sandbox';

@Component({
  selector: 'app-settings-countries',
  templateUrl: 'personalize-order.component.html',
  styleUrls: ['./personalize-order.scss']
})
export class PersonalizeOrderComponent implements OnInit {

  public perOrderForm: FormGroup;
  public invoicePrefix: FormControl;
  public orderStatus: FormControl;
  public submitted = false;
  private subscriptions: Array<Subscription> = [];
  private keyword = '';
  private offset: number;
  public pageSize = 5;

  constructor(
    public fb: FormBuilder,
    public orderStatusSandbox: OrderstatusSandbox,
    public sandbox: PersonalizeOrderSandbox
  ) {}

  get f() {
    return this.perOrderForm.controls;
  }

  /**
   * Handles form 'ngOnInit' event. Calls InitForm , Bind Forms Value - navigation function here.
   *
   */
  ngOnInit() {
    this.initForm();
    this.getPersonalizeOrder();
    this.getOrderStatusList(this.offset, this.keyword);
    this.subscribe();
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  initForm() {
    this.perOrderForm = this.fb.group({
      invoicePrefix: [null, [Validators.required]],
      orderStatus: [null, [Validators.required]]
    });
  }

  /**
   * Handles form 'submit' event. Calls sandbox CreatePersonalizeOrder function if form is valid.
   *
   * @param perOrderForm entire form value
   * @param para storing entire value
   */

  onSubmit() {
    this.submitted = true;
    if (this.perOrderForm.invalid) {
      return;
    }
    const para: any = {};
    para.orderStatus = this.perOrderForm.value.orderStatus;
    para.invoicePrefix = this.perOrderForm.value.invoicePrefix;
    this.sandbox.createPersonalizeOrder(para);
  }

  /**
   * Handles form 'list' event. Calls sandbox ProductInfo  function .
   *
   */
  getPersonalizeOrder() {
    this.sandbox.getPersonalizeOrder();
  }

  subscribe() {
    this.subscriptions.push(
      this.sandbox.getPersonalizeOrder$.subscribe(data => {
        if (data && data[0]) {
          this.perOrderForm.controls['invoicePrefix'].setValue(
            data[0].invoicePrefix
          );
          this.perOrderForm.controls['orderStatus'].setValue(
            data[0].orderStatus
          );
        }
      })
    );
  }

  /**
   * Handles form 'list' event. Calls sandbox OrderStatus List function .
   *
   * @param params storing entire value
   */
  getOrderStatusList(offset: number = 0, keyword) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    this.orderStatusSandbox.orderStatusList(params);
  }
}
