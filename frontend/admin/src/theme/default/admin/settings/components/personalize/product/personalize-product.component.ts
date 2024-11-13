/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
//angular common
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
//Sandbox and services
import { PersonalizeProductSandbox } from '../../../../../../../core/admin/settings/personalize/product/product-sandbox';
// third party 
import { Subscription } from 'rxjs/index';

@Component({
  selector: 'app-settings-personalize',
  templateUrl: 'personalize-product.component.html',
  styleUrls: ['./personalize-product.scss']
})
export class PersonalizeProductComponent implements OnInit {
  // Form 
  public perProductForm: UntypedFormGroup;
  public itemPage: UntypedFormControl;
  public productCount: UntypedFormControl;

  // Validation
  public submitted = false;

  //Subscriptions
  private subscriptions: Array<Subscription> = [];

  // Funtions and logics related 
  private siteUrl: number;
  private settingsId: number
  perPage: any = 0;

  constructor(
    public fb: UntypedFormBuilder,
    public sandbox: PersonalizeProductSandbox,
    public titleService: Title
  ) {
    this.titleService.setTitle('Settings | Personalize');
  }

  // VALIDATION
  get f() {
    return this.perProductForm.controls;
  }

  /**
   * Handles form 'ngOnInit' event. Calls InitForm , Bind Forms Value - navigation function here.
   *
   */
  ngOnInit() {
    this.intializeFunctions()
  }



  validateInput(): void {
    if (this.perPage === 0 || isNaN(this.perPage)) {
      this.perPage = 10;
    }
  }



  onSubmit(): void {
    this.submitted = true;
    if (this.perProductForm.invalid) {
      return;
    }
    const para: any = {};
    para.itemPage = this.perProductForm.value.itemPage;
    para.siteUrl = this.siteUrl;
    para.settingId = this.settingsId;
    para.categoryProductCount = 1;
    this.sandbox.createPersonalizeProduct(para);
  }

  //Personalise product subscription
  private getPersonalizeProduct(): void {
    this.sandbox.getPersonalizeProduct();
    this.sandbox.getPersonalizeProduct$.subscribe(val => {
      if (val) {
        this.siteUrl = val[0].siteUrl;
        this.settingsId = val[0].settingsId;
        sessionStorage.setItem('itemsPerPage', val[0].itemsPerPage);
        localStorage.setItem('itemsPerPage', val[0].itemsPerPage);
      }
    })
  }

  // Subscribe general settings data bind form control values
  private subscribe(): void {
    this.subscriptions.push(
      this.sandbox.getPersonalizeProduct$.subscribe(data => {
        if (data && data[0]) {
          if (data[0].itemsPerPage == 0) {
            this.perProductForm.controls['itemPage'].setValue(10);
            sessionStorage.setItem('10', 'itemsPerPage');
            localStorage.setItem('10', 'itemsPerPage')
          } else {
            this.perProductForm.controls['itemPage'].setValue(data[0].itemsPerPage);
          }
          if (data[0].categoryProductCount === 1) {
            this.perProductForm.patchValue({ productCount: 'Yes', tc: true });
          } else if (data[0].categoryProductCount === 0) {
            this.perProductForm.patchValue({ productCount: 'No', tc: true });
          }
        }
      })
    );
  }
  // Set PostCode Default Value -Yes
  private setDefaultValues(): void {
    this.perProductForm.patchValue({ productCount: 'Yes', tc: true });
  }

  // FORM VALIDATION
  private initForm(): void {
    this.perProductForm = this.fb.group({
      itemPage: [''],
      productCount: [null]
    });
  }
  //Funtion intialzed 
  private intializeFunctions() {
    this.initForm();
    this.setDefaultValues();
    this.getPersonalizeProduct();
    this.subscribe();
  }

}
