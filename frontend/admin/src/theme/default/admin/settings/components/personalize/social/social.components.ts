/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// angular common 
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';

// third party 
import { Subscription } from 'rxjs/index';
// Sandbox 
import { SocialSandbox } from '../../../../../../../core/admin/settings/siteSettings/social/social.sandbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-sitesettings-social',
  templateUrl: './social.component.html',
  styles: [`
  .settings-right-wrapper {
    margin-top: 0px !important;
}.settings-right-wrapper {
  display: block;
  margin-left: 0px !important;
  background: white;
  padding: 15px 30px 100px;
  margin-top: 40px;
}.setting2-inner-header {
  justify-content: space-between;
  margin-bottom: 15px;
  margin-left: 0px !important;
  padding: 8px;
}`]
})
export class SocialComponent implements OnInit {
//Subscriptions
  private subscriptions: Array<Subscription> = [];
  // Form 
  public socialForm: UntypedFormGroup;
  public facebook: UntypedFormControl;
  public google: UntypedFormControl;
  public twitter: UntypedFormControl;
  public instagram: UntypedFormControl;
  // validation 
  public submitted = false;
  // Url 
  public siteUrl: number;
  public settingsId: number;
  constructor(
    public socialsandbox: SocialSandbox,
    public fb: UntypedFormBuilder,
    private router: Router,
    public titleService: Title
  ) {
    this.titleService.setTitle('Settings | Personalize');
  }


  ngOnInit() {
    this.initForm();
    this.subscribe();
    this.getSocialInfo();
  }

  initForm() {
    this.facebook = new UntypedFormControl('');
    this.google = new UntypedFormControl('');
    this.twitter = new UntypedFormControl('');
    this.instagram = new UntypedFormControl('');
    this.socialForm = this.fb.group({
      facebook: this.facebook,
      google: this.google,
      twitter: this.twitter,
      instagram: this.instagram
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.socialForm.invalid) {
      return;
    }
    const params: any = {};
    params.facebook = this.socialForm.value.facebook;
    params.google = this.socialForm.value.google;
    params.twitter = this.socialForm.value.twitter;
    params.instagram = this.socialForm.value.instagram;
    params.siteUrl = this.siteUrl;
    params.settingId = this.settingsId;
    this.socialsandbox.createSocial(params);
  }
  cancel() {
    this.router.navigate(['/settings']);
  }

  /**
   * Handles form 'list' event. Calls sandbox Social  getSocial function.
   *
   */
  private getSocialInfo() {
    this.socialsandbox.getSocial();
    this.socialsandbox.getSocial$.subscribe(val => {
      if (val) {
        this.siteUrl = val[0].siteUrl;
        this.settingsId = val[0].settingsId;
      }
    })
  }

  // Subscribe Social Data bind from control
 private subscribe() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
    this.subscriptions.push(
      this.socialsandbox.getSocial$.subscribe(data => {
        if (data && data[0]) {
          this.socialForm.controls['facebook'].setValue(data[0].facebook);
          this.socialForm.controls['google'].setValue(data[0].google);
          this.socialForm.controls['twitter'].setValue(data[0].twitter);
          this.socialForm.controls['instagram'].setValue(data[0].instagram);
        }
      })
    );
  }


}
