/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

//angular common imports
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

// Sandbox and service 
import { CountrySandbox } from '../../../../../../../../core/admin/settings/localizations/country/country.sandbox';
import { CountryService } from '../../../../../../../../core/admin/settings/localizations/country/country.service';
import { formFields } from './add.constant';
import { getFormControlsFieldsObj, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';

@Component({
  selector: 'app-settings-countries',
  templateUrl: 'add.component.html',
  styleUrls: ['./add.component.scss']
})
export class CountriesAddComponent implements OnInit {

  // Form 


  // Reusable Form 
  _Object = Object;
  dynamicObjControls: any = {};
   formObjFormGroup: UntypedFormGroup;

  // List 
  public price: any;
  private editCountryInfo: any = [];
  private editCountryId: any;
  public updatetitle: number;
  
  // validation 
  public submitted = false;

  // pagination 
  public currentPage = 1;

   //Pagination 
   limit: number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;

  // Arrow functions
  trackByIndex = (index: number): number => index;

  constructor(
    public modalService: NgbActiveModal,
    public fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    public sandbox: CountrySandbox,
    private router: Router,
    public service: CountryService,
    public titleService: Title,
    private ref:ChangeDetectorRef
  ) {
    this.titleService.setTitle('Settings | Localization');
  }

 

  /**
   * Handles form 'ngOnInit' event. Calls InitForm , Bind Forms Value - navigation function here.
   *
   */
  ngOnInit() {
    //build Form
    this.buildForm()
    // intialize function 
    this.intializeFuntion()

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

  onSubmit() {
    this.submitted = true;
    if (this.formObjFormGroup.invalid) {
      return;
    }
    const params: any = {};
    params.countryName = this.formObjFormGroup.value.countryName;
    params.isocode1 = this.formObjFormGroup.value.isocode1;
    params.isocode2 = this.formObjFormGroup.value.isocode2;
    params.postcodeRequired = this.formObjFormGroup.value.postalCode;
    if (this.formObjFormGroup.value.status === 1) {
      params.status = '1';
    }
    if (this.formObjFormGroup.value.status === 0) {
      params.status = '0';
    }
    if (this.formObjFormGroup.value.postalCode === 'Yes') {
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


  editCountryList() {
    this.editCountryInfo.push(this.service.getcountrylistdata());
    if (this.editCountryInfo[0] !== null) {
      if (this.editCountryInfo[0] && this.editCountryInfo[0].name) {
        this.updatetitle = 1;
        this.formObjFormGroup.controls['countryName'].setValue(
          this.editCountryInfo[0].name
        );
        this.formObjFormGroup.controls['isocode1'].setValue(
          this.editCountryInfo[0].isoCode2
        );
        this.formObjFormGroup.controls['isocode2'].setValue(
          this.editCountryInfo[0].isoCode3
        );
        this.formObjFormGroup.controls['status'].setValue(
          this.editCountryInfo[0].isActive
        );
        this.ref.detectChanges()
        if (this.editCountryInfo[0].postcodeRequired === 1) {
          this.formObjFormGroup.patchValue({ postalCode: 'Yes', tc: true });
        } else if (this.editCountryInfo[0].postcodeRequired === 0) {
          this.formObjFormGroup.patchValue({ postalCode: 'No', tc: true });
        }
      }
    }
  }
  
   // Intialize form
   private buildForm(): void {
    const formObjModel = formFields;
    const formGroupField = getFormControlsFieldsObj(formObjModel);
    this.formObjFormGroup = this.fb.group(formGroupField);
    Object.keys(formObjModel).forEach((element: any) => {
     this.dynamicObjControls[element] = getTypes(formObjModel[element],this.formObjFormGroup);
   });
 }
  // setDefaultValues
  private setDefaultValues() {
    this.formObjFormGroup.patchValue({ postalCode: 'Yes', tc: true });
  }
  //funtion intialized here
  private intializeFuntion() {
    this.setDefaultValues();
    this.editCountryId = this.route.snapshot.paramMap.get('id');
    this.editCountryList();
  }

}
