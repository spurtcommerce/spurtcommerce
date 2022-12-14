/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
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
  public pageSize = '10';
  public keyword = '';
  public offset: number;
  private pagenationcount = true;
  public countryForm: FormGroup;
  public countryName: FormControl;
  public isocode1: FormControl;
  public isocode2: FormControl;
  public postalCode: FormControl;
  public status: FormControl;
  public price: any;
  public submitted = false;
  private editCountryInfo: any = [];
  private editCountryId: any;
  public updatetitle: number;

  constructor(

    public modalService: NgbActiveModal,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    public sandbox: CountrySandbox,
    private router: Router,
    public service: CountryService
  ) { }

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
    this.editCountryId = this.route.snapshot.paramMap.get('id');
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

  setDefaultValues() {
    this.countryForm.patchValue({ postalCode: 'Yes', tc: true });
  }

  initForm() {
    this.countryForm = this.fb.group({
      countryName: [null, [Validators.required]],
      isocode1: [null, [Validators.required, Validators.maxLength(2)]],
      isocode2: [null, [Validators.required, Validators.maxLength(3)]],
      status: [null, [Validators.required]],
      postalCode: [null]
    });
  }
  close() {
    this.modalService.close('close');

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
    const params: any = {};
    params.countryName = this.countryForm.value.countryName;
    params.isocode1 = this.countryForm.value.isocode1;
    params.isocode2 = this.countryForm.value.isocode2;
    params.postcodeRequired = this.countryForm.value.postalCode;
    if (this.countryForm.value.status === 1) {
      params.status = '1';
    }
    if (this.countryForm.value.status === 0) {
      params.status = '0';
    }
    if (this.countryForm.value.postalCode === 'Yes') {
      params.postcodeRequired = 1;
    } else {
      params.postcodeRequired = 0;
    }
    if (this.editCountryInfo && this.editCountryInfo[0]) {
      params.id = this.editCountryInfo[0].countryId;
      this.sandbox.updateCountry(params);
    } else {
      this.sandbox.addCountry(params);
    }

    this.modalService.close('close');

  }


  /**
   * Handles form 'edit' event. Bind All Values using FormControl.
   *
   * @param editCountryInfo using entire formgroup controls
   */
  editCountryList() {
    this.editCountryInfo.push(this.service.getcountrylistdata());
    if (this.editCountryInfo[0] !== null) {
      if (this.editCountryInfo[0] && this.editCountryInfo[0].name) {
        this.updatetitle = 1;
        this.countryForm.controls['countryName'].setValue(
          this.editCountryInfo[0].name
        );
        this.countryForm.controls['isocode1'].setValue(
          this.editCountryInfo[0].isoCode2
        );
        this.countryForm.controls['isocode2'].setValue(
          this.editCountryInfo[0].isoCode3
        );
        this.countryForm.controls['status'].setValue(
          this.editCountryInfo[0].isActive
        );
        if (this.editCountryInfo[0].postcodeRequired === 1) {
          this.countryForm.patchValue({ postalCode: 'Yes', tc: true });
        } else if (this.editCountryInfo[0].postcodeRequired === 0) {
          this.countryForm.patchValue({ postalCode: 'No', tc: true });
        }
      }
    } else {
      this.countryForm = null;
    }
  }
}
