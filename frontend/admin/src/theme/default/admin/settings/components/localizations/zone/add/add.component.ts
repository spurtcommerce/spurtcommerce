import { CountryService } from './../../../../../../../../core/admin/settings/localizations/country/country.service';
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
//angular common imports
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Validators,
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormBuilder
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
// third party imports 
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

// sandbox and service 
import { ZoneSandbox } from '../../../../../../../../core/admin/settings/localizations/zone/zone.sandbox';
import { ZoneService } from '../../../../../../../../core/admin/settings/localizations/zone/zone.service';
import { CountrySandbox } from '../../../../../../../../core/admin/settings/localizations/country/country.sandbox';
import { getFormControlsFieldsObj, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';
import { objForm } from './add.constant';
// additional imports 
const CSS_CLASS_NAMES = {
  highLight: 'dd-highlight-item'
};
@Component({
  selector: 'app-settings-zone-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  styles: [`
  .settings-right-wrapper {
    margin-top: 0px !important;
}`]
})
export class ZoneAddComponent implements OnInit, OnDestroy {

  // FormGroup Variable
  public zoneForm: UntypedFormGroup;
  public zoneName: UntypedFormControl;
  public zoneCode: UntypedFormControl;
  public country: UntypedFormControl;
  public status: UntypedFormControl;

  // validation 
  public submitted = false;
  public countryValid: any;
  private valid: boolean;
  // pagination 
  public pageSize = 5;
  private isCount: boolean;
  private keyword = '';
  private offset: any;
  private pagenationCount = 1;

  // List 
  private editZoneInfo: any = [];
  public updateTitle: any;
  public countryList: any = [];
  private countryId: any;
  private editZoneId: any;

  // configurations 
  public config: any = { displayKey: 'name', value: 'countryId', search: true };

  // Reusable form 
  dynamicObjControls: any = {};
  formObjFormGroup: any;

  // object intiate
  _Object = Object;

  private updateZoneSubscription: Subscription;
  constructor(
    public modalService: NgbActiveModal,
    public fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    public sandbox: ZoneSandbox,
    public countrySandbox: CountrySandbox,
    private router: Router,
    public service: ZoneService, public countryService: CountryService,
    public titleService: Title
  ) {
    this.titleService.setTitle('Settings | Localization');
  }


  ngOnInit() {
    // form
    this.buildForm();

    // list and other logics 
    this.intializeFunction();

  }



  //OnSubmit Data
  onSubmit() {
    this.submitted = true;

    if (this.formObjFormGroup.invalid) {
      return;
    }
    const params: any = {};
    params.zonename = this.formObjFormGroup.value.zoneName;
    params.zonecode = this.formObjFormGroup.value.zoneCode;
    params.country = this.formObjFormGroup.value.country;
    params.status = this.formObjFormGroup.value.status.toString();

    if (this.editZoneInfo && this.editZoneInfo[0].zoneId) {
      params.zoneId = this.editZoneInfo[0].zoneId;
      this.sandbox.updateZone(params);
      this.updateZoneSubscription = this.sandbox.updateZone$.subscribe(val => {
        if (val?.status == 1) {
          this.modalService.close('clear');

        }
      })

    } else {
      this.sandbox.addNewZone(params);
      this.updateZoneSubscription = this.sandbox.newZone$.subscribe(val => {
        if (val?.status == 1) {
          this.modalService.close('clear');
        }
      })

    }
  }


  close(): void {
    this.modalService.close('close');
  }

  cancel(): void {
    this.router.navigate(['/settings/local/zone']);
  }


  // Subscribe 
  private subscribe() {
    this.countrySandbox.countryList$.subscribe(data => {
      this.countryList = data;
    });
  }

  //list data subscribe
  private getCountryList() {
    const param: any = {};
    param.keyword = '';
    this.countryService.countrylist(param).subscribe(list => {
      if (list != undefined) {
        objForm.country.customData.data = list.data;
      }
    })
  }


  //Edit data seting value
  private editZoneList(): void {
    this.editZoneInfo.push(this.service.getzonelistdata());
    if (this.editZoneInfo[0] !== null) {
      if (this.editZoneInfo[0] && this.editZoneInfo[0].name) {
        this.updateTitle = 1;
        this.formObjFormGroup.controls['zoneName'].setValue(this.editZoneInfo[0].name);
        this.formObjFormGroup.controls['zoneCode'].setValue(this.editZoneInfo[0].code);
        this.formObjFormGroup.controls['country'].setValue(
          this.editZoneInfo[0].country.countryId
        );
        this.formObjFormGroup.controls['status'].setValue(
          String(this.editZoneInfo[0].isActive)
        );
      }
    } else {
      this.formObjFormGroup = null;
    }
  }

  // intializeFunction
  private intializeFunction() {
    this.country = null;
    this.getCountryList();
    this.editZoneId = this.route.snapshot.paramMap.get('id');
    this.editZoneList();
    this.subscribe();
  }


  // intialize form
  private buildForm(): void {
    const formObjModel = objForm;
    const formGroupField = getFormControlsFieldsObj(formObjModel);
    this.formObjFormGroup = this.fb.group(formGroupField);
    Object.keys(formObjModel).forEach((element: any) => {
      this.dynamicObjControls[element] = getTypes(formObjModel[element], this.formObjFormGroup);
    });
  }

  ngOnDestroy() {
    if (this.updateZoneSubscription) {
      this.updateZoneSubscription.unsubscribe();
    }
  }

}
