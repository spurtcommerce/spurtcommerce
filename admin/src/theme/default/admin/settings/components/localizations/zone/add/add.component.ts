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
import { ZoneSandbox } from '../../../../../../../../core/admin/settings/localizations/zone/zone.sandbox';
import { ZoneService } from '../../../../../../../../core/admin/settings/localizations/zone/zone.service';
import { CountrySandbox } from '../../../../../../../../core/admin/settings/localizations/country/country.sandbox';
const CSS_CLASS_NAMES = {
  highLight: 'dd-highlight-item'
};
@Component({
  selector: 'app-settings-zone-add',
  templateUrl: './add.component.html',
  styles: [`
  .settings-right-wrapper {
    margin-top: 0px !important;
}`]
})
export class ZoneAddComponent implements OnInit {
  // Variable
  public config: any = { displayKey: 'name', value: 'countryId', search: true };
  public submitted = false;
  private countryId: any;
  public pageSize = 5;
  private keyword = '';
  private offset: any;
  private valid: boolean;
  private editzoneinfo: any = [];
  private pagenationcount = 1;
  public countryvalid: any;
  public updatetitle: any;
  private EditZoneId: any;
  public countryList: any = [];

  // FormGroup Variable
  public zoneForm: FormGroup;
  public zonename: FormControl;
  public zonecode: FormControl;
  public country: FormControl;
  public status: FormControl;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    public sandbox: ZoneSandbox,
    public countrysandbox: CountrySandbox,
    private router: Router,
    public service: ZoneService
  ) {}

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
    this.EditZoneId = this.route.snapshot.paramMap.get('id');
    this.editZoneList();
    this.subscribe();
  }

  // subscribe

  subscribe() {
    this.countrysandbox.getcountries$.subscribe(data => {
      this.countryList = data;
    });
  }
  // reactive form
  initForm() {
    this.zoneForm = this.fb.group({
      zonename: [null, [Validators.required]],
      zonecode: [null, [Validators.required, Validators.maxLength(30)]],
      country: [null, [Validators.required]],
      status: ['', [Validators.required]]
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
        this.countryvalid = false;
      } else {
        this.countryvalid = true;
      }
      return;
    }
    if (
      this.zoneForm.value.zonename !== '' &&
      this.zoneForm.value.zonecode !== ''
    ) {
      const para: any = {};
      para.zonename = this.zoneForm.value.zonename;
      para.zonecode = this.zoneForm.value.zonecode;
      para.country = this.zoneForm.value.country.countryId;
      para.status = this.zoneForm.value.status;
      if (this.editzoneinfo && this.editzoneinfo[0].zoneId) {
        para.zoneId = this.editzoneinfo[0].zoneId;
        this.sandbox.updateZone(para);
      } else {
        this.sandbox.addNewZone(para);
      }
    } else {
      this.valid = true;
    }
  }

  // Cancle Navigate to  Zone List page
  zonecancel() {
    this.router.navigate(['/settings/local/zone']);
  }

  // EditZone Bind Formcontrols values
  editZoneList() {
    this.editzoneinfo.push(this.service.getzonelistdata());
    if (this.editzoneinfo[0] !== null) {
      if (this.editzoneinfo[0] && this.editzoneinfo[0].name) {
        this.updatetitle = 1;
        this.zoneForm.controls['zonename'].setValue(this.editzoneinfo[0].name);
        this.zoneForm.controls['zonecode'].setValue(this.editzoneinfo[0].code);
        this.zoneForm.controls['country'].setValue(
          this.editzoneinfo[0].country
        );
        this.zoneForm.controls['status'].setValue(
          this.editzoneinfo[0].isActive
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
    this.countrysandbox.getcountrieslist(params);
    if (this.pagenationcount) {
      params.count = 'true';
      this.countrysandbox.getCountryCount(params);
    }
  }

  // DropDown list  changes event
  selectionChanged(event) {
    this.countryId = event.value.countryId;
    if (this.countryId) {
      this.countryvalid = false;
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
