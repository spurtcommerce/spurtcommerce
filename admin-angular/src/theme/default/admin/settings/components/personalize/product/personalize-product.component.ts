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
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalizeProductSandbox } from '../../../../../../../core/admin/settings/personalize/product/product-sandbox';
import { Subscription } from 'rxjs/index';

@Component({
  selector: 'app-settings-countries',
  templateUrl: 'personalize-product.component.html',
  styleUrls: ['./personalize-product.scss']
})
export class PersonalizeProductComponent implements OnInit {

  public perProductForm: FormGroup;
  public itemPage: FormControl;
  public productCount: FormControl;
  public submitted = false;
  private subscriptions: Array<Subscription> = [];

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    public sandbox: PersonalizeProductSandbox
  ) {}

  // VALIDATION
  get f() {
    return this.perProductForm.controls;
  }

  /**
   * Handles form 'ngOnInit' event. Calls InitForm , Bind Forms Value - navigation function here.
   *
   */
  ngOnInit() {
    this.initForm();
    this.setDefaultValues();
    this.getPersonalizeProduct();
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

  // Set PostCode Default Value -Yes
  setDefaultValues() {
    this.perProductForm.patchValue({ productCount: 'Yes', tc: true });
  }

  // FORM VALIDATION
  initForm() {
    this.perProductForm = this.fb.group({
      itemPage: [null],
      productCount: [null]
    });
  }

  /**
   * Handles form 'submit' event. Calls sandbox PersonalizeProduct createPersonalizeProduct if form is valid.
   *
   * @param perProductForm entire form value
   * @param para storing entire value
   */

  onSubmit() {
    this.submitted = true;
    if (this.perProductForm.invalid) {
      return;
    }
    const para: any = {};
    para.itemPage = this.perProductForm.value.itemPage;
    if (this.perProductForm.value.productCount === 'Yes') {
      para.categoryProductCount = 1;
    } else {
      para.categoryProductCount = 0;
    }
    this.sandbox.createPersonalizeProduct(para);
  }

  /**
   * Handles form 'list' event. Calls sandbox  getPersonalizeProduct  function .
   *
   */
  getPersonalizeProduct() {
    this.sandbox.getPersonalizeProduct();
  }

  // Subscribe general settings data bind form control values
  subscribe() {
    this.subscriptions.push(
      this.sandbox.getPersonalizeProduct$.subscribe(data => {
        if (data && data[0]) {
          this.perProductForm.controls['itemPage'].setValue(
            data[0].itemsPerPage
          );
          if (data[0].categoryProductCount === 1) {
            this.perProductForm.patchValue({ productCount: 'Yes', tc: true });
          } else if (data[0].categoryProductCount === 0) {
            this.perProductForm.patchValue({ productCount: 'No', tc: true });
          }
        }
      })
    );
  }
}
