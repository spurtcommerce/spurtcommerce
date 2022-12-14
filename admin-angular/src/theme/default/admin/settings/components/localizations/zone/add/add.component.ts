/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ZoneSandbox } from '../../../../../../../../core/admin/settings/localizations/zone/zone.sandbox';
import { ZoneService } from '../../../../../../../../core/admin/settings/localizations/zone/zone.service';
import { CountrySandbox } from '../../../../../../../../core/admin/settings/localizations/country/country.sandbox';
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
export class ZoneAddComponent implements OnInit {

  public config: any = { displayKey: 'name', value: 'countryId', search: true };
  public submitted = false;
  private countryId: any;
  public pageSize = 5;
  private isCount: boolean;
  private keyword = '';
  private offset: any;
  private valid: boolean;
  private editZoneInfo: any = [];
  private pagenationCount = 1;
  public countryValid: any;
  public updateTitle: any;
  private editZoneId: any;
  public countryList: any = [];
  // FormGroup Variable
  public zoneForm: FormGroup;
  public zoneName: FormControl;
  public zoneCode: FormControl;
  public country: FormControl;
  public status: FormControl;

  constructor(
    public modalService: NgbActiveModal,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    public sandbox: ZoneSandbox,
    public countrySandbox: CountrySandbox,
    private router: Router,
    public service: ZoneService
  ) { }

  // VALIDATION
  get f() {
    return this.zoneForm.controls;
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  /**initially calls  getCountryListwith arguments(offset,keyword)
   * initForm,editZoneList
   *
   * */
  ngOnInit() {
    this.country = null;
    this.getCountryList(this.offset, this.keyword);
    this.initForm();
    this.editZoneId = this.route.snapshot.paramMap.get('id');
    this.editZoneList();
    this.subscribe();
  }

  subscribe() {
    this.countrySandbox.countryList$.subscribe(data => {
      this.countryList = data;
    });
  }

  initForm() {
    this.zoneForm = this.fb.group({
      zoneName: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(128)
      ])],
      zoneCode: [null, [Validators.required, Validators.maxLength(30)]],
      country: [null, [Validators.required]],
      status: [null, [Validators.required]]
    });
  }

  /**
   * Handles form 'submit' event. Calls sandbox Zone updateZone and addNewZone function if form is valid.
   *
   * @param countryForm entire form value
   * @param para storing entire value
   */
  onSubmit() {
    this.submitted = true;

    if (this.zoneForm.invalid) {
      if (this.countryId) {
        this.countryValid = false;
      } else {
        this.countryValid = true;
      }
      return;
    }
    if (
      this.zoneForm.value.zoneName !== '' &&
      this.zoneForm.value.zoneCode !== ''
    ) {
      const para: any = {};
      para.zonename = this.zoneForm.value.zoneName;
      para.zonecode = this.zoneForm.value.zoneCode;
      para.country = this.zoneForm.value.country;
      para.status = this.zoneForm.value.status.toString();

      if (this.editZoneInfo && this.editZoneInfo[0].zoneId) {
        para.zoneId = this.editZoneInfo[0].zoneId;
        this.sandbox.updateZone(para);
        this.getZonesList(this.offset);
      } else {
        this.sandbox.addNewZone(para);
        this.getZonesList(this.offset);
      }
    } else {
      this.valid = true;
    }

    this.modalService.close('close');
  }

  getZonesList(offset: number = 0) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    params.status = '';
    this.sandbox.getZoneList(params);
    if (this.isCount) {
      params.count = true;
      this.sandbox.getZonePagination(params);
    }
  }



  close() {
    this.modalService.close('close');

  }
  cancel() {
    this.router.navigate(['/settings/local/zone']);
  }

  editZoneList() {
    this.editZoneInfo.push(this.service.getzonelistdata());
    if (this.editZoneInfo[0] !== null) {
      if (this.editZoneInfo[0] && this.editZoneInfo[0].name) {
        this.updateTitle = 1;
        this.zoneForm.controls['zoneName'].setValue(this.editZoneInfo[0].name);
        this.zoneForm.controls['zoneCode'].setValue(this.editZoneInfo[0].code);
        this.zoneForm.controls['country'].setValue(
          this.editZoneInfo[0].country.countryId
        );
        this.zoneForm.controls['status'].setValue(
          this.editZoneInfo[0].isActive
        );
        //
      }
    } else {
      this.zoneForm = null;
    }
  }

  /**
   * Handles form 'dropdown list' event. Calls sandbox Country getcountrieslist and getCountryCount function if form is valid.
   *
   * @param params storing entire value
   */
  getCountryList(offset: number = 0, keyword) {
    const params: any = {};
    params.limit = '';
    params.offset = offset;
    params.keyword = this.keyword;
    params.status = 1;
    this.countrySandbox.getCountriesList(params);
    if (this.pagenationCount) {
      params.count = 'true';
      this.countrySandbox.getCountryCount(params);
    }
  }

  // DropDown list  changes event
  selectionChanged(event) {
    this.countryId = event;
    if (this.countryId) {
      this.countryValid = false;
    }
  }

  // mouseOver event
  onHover(event) {
    const target = event.target as HTMLElement;
    if (event.type === 'mouseover') {
      target.classList.add(CSS_CLASS_NAMES.highLight);
    } else {
      target.classList.remove(CSS_CLASS_NAMES.highLight);
    }
  }
}
