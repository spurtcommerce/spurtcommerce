/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs/index';
import { SocialSandbox } from '../../../../../../../core/admin/settings/siteSettings/social/social.sandbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-sitesettings-social',
  templateUrl: './social.component.html',
  styles: [`
  .settings-right-wrapper {
    margin-top: 0px !important;
}`]
})
export class SocialComponent implements OnInit {
  private subscriptions: Array<Subscription> = [];
  public socialForm: FormGroup;
  public Facebook: FormControl;
  public Google: FormControl;
  public Twitter: FormControl;
  public Instagram: FormControl;
  public submitted = false;

  constructor(
    public socialsandbox: SocialSandbox,
    public fb: FormBuilder,
    private router: Router
  ) {}

  // initially calls initForm,subscripe,getsocialinfo

  ngOnInit() {
    this.initForm();
    this.subscripe();
    this.getsocialinfo();
  }

  // Init FormGroup
  initForm() {
    this.Facebook = new FormControl('');
    this.Google = new FormControl('');
    this.Twitter = new FormControl('');
    this.Instagram = new FormControl('');
    this.socialForm = this.fb.group({
      Facebook: this.Facebook,
      Google: this.Google,
      Twitter: this.Twitter,
      Instagram: this.Instagram
    });
  }

  /**
   * Handles form 'submit' event. Calls sandbox Social  createSocial function if form is valid.
   *
   * @param socialForm entire form value
   * @param params storing entire value
   */
  onSubmit() {
    this.submitted = true;
    if (this.socialForm.invalid) {
      return;
    }

    const params: any = {};
    params.facebook = this.socialForm.value.Facebook;
    params.google = this.socialForm.value.Google;
    params.twitter = this.socialForm.value.Twitter;
    params.instagram = this.socialForm.value.Instagram;
    this.socialsandbox.createSocial(params);
  }

  /**
   * Handles form 'list' event. Calls sandbox Social  getSocial function.
   *
   */
  getsocialinfo() {
    this.socialsandbox.getSocial();
  }

  // Subscribe Social Data bind from control
  subscripe() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
    this.subscriptions.push(
      this.socialsandbox.getSocial$.subscribe(data => {
        if (data && data[0]) {
          this.socialForm.controls['Facebook'].setValue(data[0].facebook);
          this.socialForm.controls['Google'].setValue(data[0].google);
          this.socialForm.controls['Twitter'].setValue(data[0].twitter);
          this.socialForm.controls['Instagram'].setValue(data[0].instagram);
        }
      })
    );
  }

  // Social Cancle navigate to Dashboard
  socialcancel() {
    this.router.navigate(['/dashboard']);
  }
}
