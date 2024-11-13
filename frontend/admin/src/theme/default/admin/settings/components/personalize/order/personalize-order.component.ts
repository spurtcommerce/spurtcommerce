/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

// angular commmon 
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { Title } from '@angular/platform-browser';

// Third Party
import { Subscription } from 'rxjs/index';

// Sandbox and services 
import { OrderstatusApiClientService } from './../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus-ApiClientService';
import { OrderstatusSandbox } from '../../../../../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';
import { PersonalizeOrderSandbox } from '../../../../../../../core/admin/settings/personalize/order/order-sandbox';

@Component({
  selector: 'app-settings-countries',
  templateUrl: 'personalize-order.component.html',
  styleUrls: ['./personalize-order.scss']
})
export class PersonalizeOrderComponent implements OnInit {

  // Form 
  public perOrderForm: UntypedFormGroup;
  public invoicePrefix: UntypedFormControl;
  public orderStatus: UntypedFormControl;
  //Validation
  public submitted = false;

  //Subscription
  private subscriptions: Array<Subscription> = [];

  //list
  private keyword = '';
  private offset: number;
  public pageSize = 5;
  public statusList: any = []
  public settingsId: number;
  // Site fetch 
  public siteUrl: number;

  constructor(
    public fb: UntypedFormBuilder,
    public orderStatusSandbox: OrderstatusSandbox,
    public sandbox: PersonalizeOrderSandbox,
    public service: OrderstatusApiClientService,
    public titleService: Title
  ) {
    this.titleService.setTitle('Settings | Personalize');
  }

  get f() {
    return this.perOrderForm.controls;
  }
  //Oninit
  ngOnInit() {
    this.initForm();
    this.getPersonalizeOrder();
    this.getOrderStatusList(this.offset, this.keyword);
  }



  initForm() {
    this.perOrderForm = this.fb.group({
      invoicePrefix: [null, [Validators.required]],
      orderStatus: [null, [Validators.required]]
    });
  }


  onSubmit() {
    this.submitted = true;
    if (this.perOrderForm.invalid) {
      return;
    }
    const para: any = {};
    para.orderStatus = this.perOrderForm.value.orderStatus;
    para.invoicePrefix = this.perOrderForm.value.invoicePrefix;
    para.settingId = this.settingsId;
    para.siteUrl = this.siteUrl;
    this.sandbox.createPersonalizeOrder(para);
  }

  // getPersonalized order 
  private getPersonalizeOrder() {
    this.sandbox.getPersonalizeOrder();
    this.sandbox.getPersonalizeOrder$.subscribe(val => {
      if (val) {
        this.settingsId = val[0].settingsId;
        this.siteUrl = val[0].siteUrl
      }
    })
  }
  // Subscribe 
  private subscribe() {
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
  // get Order status List 
  private getOrderStatusList(offset: number = 0, keyword) {
    const params: any = {};
    params.status=1
    params.keyword = this.keyword;
    // this.orderStatusSandbox.orderStatusList(params);
    this.service.getorderstatuslist(params).subscribe(list => {
      if (list) {
        this.statusList = list.data;
        this.subscribe();
      }
    })
  }
}
