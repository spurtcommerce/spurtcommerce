/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
//angular common
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
// Third party 
import { Subscription } from 'rxjs/index';
// Sandbox 
import { SeoSandbox } from '../../../../../../../core/admin/settings/siteSettings/seo/seo-sandbox';
import { formFields } from './seo.constant';
import { getFormControlsFieldsObj, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';


@Component({
  selector: 'app-settings-sitesettings-seo',
  templateUrl: './seo.component.html',
  styles: [`
  .settings-right-wrapper {
    margin-top: 0px !important;
   }
   .validationcolor {
    border-color: red !important;
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
}
`]
})
export class SeoComponent implements OnInit {
  
   // Reusable form
   _Object = Object;
   dynamicObjControls: any = {};

  // Validation 
  public submitted = false;

  // Form 
  public formObjFormGroup: UntypedFormGroup;
  public metaTitle: UntypedFormControl;
  public metaTagDescription: UntypedFormControl;
  public metaTagKeyword: UntypedFormControl;
  // Query data 
  public siteUrl: number;
  public settingsId: number;

  // Subscription 
  private subscriptions: Array<Subscription> = [];
  // Arrow functions
  trackByIndex = (index: number): number => index;

 //Pagination 
  limit: number = sessionStorage.getItem('itemsPerPage') ? Number(sessionStorage.getItem('itemsPerPage')) : 10;

  constructor(
    public fb: UntypedFormBuilder,
    public seoSandbox: SeoSandbox,
    private router: Router,
    public titleService: Title,
    private ref:ChangeDetectorRef
  ) {
    this.titleService.setTitle('Settings | SEO');
  }

  // initially calls initForm,getseoinfo,subscribe
  ngOnInit() {
    // build Form 
    this.buildForm();

    this.getseoinfo();
    this.subscribe();
  }


  /**
   * Handles form 'list' event. Calls sandbox Seo getSeo  function .
  *
   */

  /**
   * Handles form 'submit' event. Calls sandbox Seo createSeo function if form is valid.
   * @param seoForm entire form value
   * @param params storing entire value
  */
  onSubmit() {
    this.submitted = true;
    if (this.formObjFormGroup.invalid) {
      return;
    }
    const params: any = {};
    params.metaTagTitle = this.formObjFormGroup.value.metaTitle;
    params.metaTagDescription = this.formObjFormGroup.value.metaTagDescription;
    params.metaTagKeywords = this.formObjFormGroup.value.metaTagKeyword;
    params.siteUrl = this.siteUrl;
    params.settingId = this.settingsId;
    this.seoSandbox.createSeo(params);
  }
  // Cancel Seo 
  seoCancel() {
    this.router.navigate(['/settings']);
  }
  // Init Form Group
  private initForm() {
    this.metaTitle = new UntypedFormControl('', Validators.compose([
      Validators.maxLength(70)
    ]));
    this.metaTagDescription = new UntypedFormControl('', Validators.compose([
      Validators.maxLength(160)
    ]));
    this.metaTagKeyword = new UntypedFormControl('', Validators.compose([
      Validators.maxLength(255)
    ]));
    this.formObjFormGroup = this.fb.group({
      metaTitle: this.metaTitle,
      metaTagDescription: this.metaTagDescription,
      metaTagKeyword: this.metaTagKeyword
    });
  }

  // Subscribe getSeoinfo Bind formcontrol
  private subscribe() {
    // this.subscriptions.push(this.seoSandbox.newSeo$.subscribe(data => { }));
    // this.subscriptions.push(
      this.seoSandbox.getSeo$.subscribe(data => {
        this.ref.detectChanges()
        if (data && data[0]) {
          this.formObjFormGroup.controls['metaTagDescription'].setValue(
            data[0].metaTagDescription
          );
          this.formObjFormGroup.controls['metaTagKeyword'].setValue(
            data[0].metaTagKeywords
          );
          this.formObjFormGroup.controls['metaTitle'].setValue(data[0].metaTagTitle);
        }
      })
    // );
  }
  // getSeoDetail subscribe 
  private getseoinfo() {
    this.seoSandbox.getSeo();
    this.seoSandbox.getSeo$.subscribe(val => {
      if (val) {
        this.siteUrl = val[0].siteUrl;
        this.settingsId = val[0].settingsId;
      }
    })
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
}
