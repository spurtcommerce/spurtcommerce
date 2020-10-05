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
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/index';
import { SeoSandbox } from '../../../../../../../core/admin/settings/siteSettings/seo/seo-sandbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-sitesettings-seo',
  templateUrl: './seo.component.html',
  styles: [`
  .settings-right-wrapper {
    margin-top: 0px !important;
}`]
})
export class SeoComponent implements OnInit {
  private subscriptions: Array<Subscription> = [];

  public seoForm: FormGroup;
  public submitted = false;
  public MetaTitle: FormControl;
  public MetaTagDescription: FormControl;
  public MetatagKeyword: FormControl;

  constructor(
    public fb: FormBuilder,
    public seosandbox: SeoSandbox,
    private router: Router
  ) {}

  // initially calls initForm,getseoinfo,subscribe
  ngOnInit() {
    this.initForm();
    this.getseoinfo();
    this.subscribe();
  }

  // Subscribe getSeoinfo Bind formcontrol
  subscribe() {
    this.subscriptions.push(this.seosandbox.getNewseo$.subscribe(data => {}));
    this.subscriptions.push(
      this.seosandbox.getseo$.subscribe(data => {
        if (data && data[0]) {
          this.seoForm.controls['MetaTagDescription'].setValue(
            data[0].metaTagDescription
          );
          this.seoForm.controls['MetatagKeyword'].setValue(
            data[0].metaTagKeywords
          );
          this.seoForm.controls['MetaTitle'].setValue(data[0].metaTagTitle);
        }
      })
    );
  }

  /**
   * Handles form 'list' event. Calls sandbox Seo getSeo  function .
   *
   */
  getseoinfo() {
    this.seosandbox.getSeo();
  }

  // Init Form Group
  initForm() {
    this.MetaTitle = new FormControl('');
    this.MetaTagDescription = new FormControl('');
    this.MetatagKeyword = new FormControl('');
    this.seoForm = this.fb.group({
      MetaTitle: this.MetaTitle,
      MetaTagDescription: this.MetaTagDescription,
      MetatagKeyword: this.MetatagKeyword
    });
  }

  /**
   * Handles form 'submit' event. Calls sandbox Seo createSeo function if form is valid.
   *
   * @param seoForm entire form value
   * @param params storing entire value
   */
  onSubmit() {
    this.submitted = true;
    if (this.seoForm.invalid) {
      return;
    }

    const params: any = {};
    params.metaTagTitle = this.seoForm.value.MetaTitle;
    params.metaTagDescription = this.seoForm.value.MetaTagDescription;
    params.metaTagKeywords = this.seoForm.value.MetatagKeyword;
    this.seosandbox.createSeo(params);
  }

  // Cancle navigate to dashboard
  seoCancel() {
    this.router.navigate(['/dashboard']);
  }
}
