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
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountrySandbox } from '../../../../../../../../core/admin/settings/localizations/country/country.sandbox';
import { CountryService } from '../../../../../../../../core/admin/settings/localizations/country/country.service';

@Component({
  selector: 'app-settings-countries',
  templateUrl: 'add.component.html',
  styleUrls: ['./add.component.scss']
})
export class CountriesAddComponent implements OnInit {
  // VARIABLES
  public countryForm: FormGroup;
  public countryName: FormControl;
  public isocode1: FormControl;
  public isocode2: FormControl;
  public postalcode: FormControl;
  public status: FormControl;
  public price: any;
  public submitted = false;
  private editcountryinfo: any = [];
  private EditCountryId: any;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    public sandbox: CountrySandbox,
    private router: Router,
    public service: CountryService
  ) {}

  // VALIDATION
  get f() {
    return this.countryForm.controls;
  }

  /**
   * Handles form 'ngOnInit' event. Calls InitForm , Bind Forms Value - navigation function here.
   *
   */
  ngOnInit() {
    this.initForm();
    this.setDefaultValues();
    this.EditCountryId = this.route.snapshot.paramMap.get('id');
    this.editCountryList();
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
    this.countryForm.patchValue({ postalcode: 'Yes', tc: true });
  }

  // FORM VALIDATION
  initForm() {
    this.countryForm = this.fb.group({
      countryName: [null, [Validators.required]],
      isocode1: [null, [Validators.required, Validators.maxLength(2)]],
      isocode2: [null, [Validators.required, Validators.maxLength(3)]],
      status: [null, [Validators.required]],
      postalcode: [null]
    });
  }

  /**
   * Handles form 'cancle' event. Calls routing - navigation function here.
   *
   */
  countrycancel() {
    this.router.navigate(['/settings/local/countries']);
  }

  /**
   * Handles form 'submit' event. Calls sandbox Country updateCountry and addCountry function if form is valid.
   *
   * @param countryForm entire form value
   * @param para storing entire value
   */

  onSubmit() {
    this.submitted = true;
    if (this.countryForm.invalid) {
      return;
    }
    const para: any = {};
    para.countryname = this.countryForm.value.countryName;
    para.isocode1 = this.countryForm.value.isocode1;
    para.isocode2 = this.countryForm.value.isocode2;
    para.postcodeRequired = this.countryForm.value.postalcode;
    if (this.countryForm.value.status === '1') {
      para.status = 1;
    }
    if (this.countryForm.value.status === '0') {
      para.status = 0;
    }
    if (this.countryForm.value.postalcode === 'Yes') {
      para.postcodeRequired = 1;
    } else {
      para.postcodeRequired = 0;
    }
    if (this.editcountryinfo && this.editcountryinfo[0]) {
      para.id = this.editcountryinfo[0].countryId;
      this.sandbox.updateCountry(para);
    } else {
      this.sandbox.addCountry(para);
    }
  }

  /**
   * Handles form 'edit' event. Bind All Values using FormControl.
   *
   * @param editcountryinfo using entire formgroup controls
   */
  editCountryList() {
    this.editcountryinfo.push(this.service.getcountrylistdata());
    if (this.editcountryinfo[0] !== null) {
      if (this.editcountryinfo[0] && this.editcountryinfo[0].name) {
        this.countryForm.controls['countryName'].setValue(
          this.editcountryinfo[0].name
        );
        this.countryForm.controls['isocode1'].setValue(
          this.editcountryinfo[0].isoCode2
        );
        this.countryForm.controls['isocode2'].setValue(
          this.editcountryinfo[0].isoCode3
        );
        this.countryForm.controls['status'].setValue(
          this.editcountryinfo[0].isActive
        );
        if (this.editcountryinfo[0].postcodeRequired === 1) {
          this.countryForm.patchValue({ postalcode: 'Yes', tc: true });
        } else if (this.editcountryinfo[0].postcodeRequired === 0) {
          this.countryForm.patchValue({ postalcode: 'No', tc: true });
        }
      }
    } else {
      this.countryForm = null;
    }
  }
}
