/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// angular common imports 
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Validators,
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormBuilder
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// third party
import { of, Subscription, } from 'rxjs';
import { switchMap, take,delay } from 'rxjs/operators';

// sandbox and services 
import { CurrencySandbox } from '../../../../../../../../core/admin/settings/localizations/currency/currency.sandbox';
import { CurrencyService } from '../../../../../../../../core/admin/settings/localizations/currency/currency.service';

// Title 
import { Title } from '@angular/platform-browser';
import { objForm } from './add.constant';
import { getFormControlsFieldsObj, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';

@Component({
  selector: 'app-spurt-currencyadd',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class CurrencyAddComponent implements OnInit,OnDestroy {

  // FORM GROUP VARIABLE
  public currencyForm: UntypedFormGroup;
  public title: UntypedFormControl;
  public code: UntypedFormControl;
  public symbolLeft: UntypedFormControl;
  public symbolRight: UntypedFormControl;
  public value: UntypedFormControl;
  public status: UntypedFormControl;
  // VARIABLE
  private params: any = {};
  private editedvalueCurrency: any = {};
  public currencyId: number;
  private editCurrencyId: string;
  public submitted = false;
  public rupeeError = [];
  
//  Subscription
 private updateCurrencySubscription: Subscription;

  constructor(
    public modalService: NgbActiveModal,
    private fb: UntypedFormBuilder,
    private sandbox: CurrencySandbox,
    private route: ActivatedRoute,
    private currencyService: CurrencyService,
    private router: Router,
    public titleService: Title
  ) {
    this.titleService.setTitle('Settings | Localization');
  }
  // Reusable form 
  dynamicObjControls: any = {};
 formObjFormGroup: any;

  ngOnInit() {
    this.buildForm();
    //Route Subscribe
    this.routeSubscribe()
    //Edit CurrencyForm
    this.editCurrencyForm();
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


  onSubmit() {
    this.submitted = true;
  
    if (!this.formObjFormGroup.valid) {
      return;
    }
    if (this.rupeeError['left'] || this.rupeeError['right']) {
      return;
    }
    const param:any={};
    param.title = this.formObjFormGroup.value.title;
    param.code = this.formObjFormGroup.value.code;
    param.symbolLeft = this.formObjFormGroup.value.symbolLeft;
    param.symbolRight = this.formObjFormGroup.value.symbolRight;
    param.status = this.formObjFormGroup.value.status;
    if (this.editedvalueCurrency) {
      param.currencyId = this.editedvalueCurrency.currencyId;
      this.sandbox.updateCurrency(param);
     this.updateCurrencySubscription=this.sandbox.currencyUpdate$.subscribe((val:any) => {
      if(val && val.status === 1){
        this.modalService.close('clear');
        }
      });
    } else {
      this.sandbox.addcurrency(param);
      this.updateCurrencySubscription=this.sandbox.currencyNew$.subscribe((val:any) => {
      if(val && val.status === 1){
        this.modalService.close('clear');
        }
      });
    }
    
  }


  close() {
    this.modalService.close('close');
  }


  checkEnable(field, event) {
    if (event.target.value !== '') {
      if (field === 'left') {
        if (event.target.value === 'र') {
          this.rupeeError['left'] = true;
        } else {
          this.rupeeError['left'] = false;
          this.rupeeError = [];
        }
       this.formObjFormGroup.controls['symbolRight'].setValue(null);
      } else if (field === 'right') {
        if (event.target.value === 'र') {
          this.rupeeError['right'] = true;
        } else {
          this.rupeeError['right'] = false;
          this.rupeeError = [];
        }
       this.formObjFormGroup.controls['symbolLeft'].setValue(null);
      }
    } else {
      this.rupeeError['left'] = false;
      this.rupeeError['right'] = false;
    }
  }

  cancel(): void {
    this.currencyService.setEditedValue('');
    this.router.navigate(['/settings/local/currency']);
  }


  private editCurrencyForm(): void {
    this.editedvalueCurrency = this.currencyService.getEditedValue();
    if (this.editedvalueCurrency) {
      this.currencyId = this.editedvalueCurrency.currencyId;
      this.formObjFormGroup.controls['title'].setValue(this.editedvalueCurrency.title);
      this.formObjFormGroup.controls['code'].setValue(this.editedvalueCurrency.code);
      this.formObjFormGroup.controls['symbolLeft'].setValue(this.editedvalueCurrency.symbolLeft);
      this.formObjFormGroup.controls['symbolRight'].setValue(this.editedvalueCurrency.symbolRight);
      this.formObjFormGroup.controls['status'].setValue(String(this.editedvalueCurrency.isActive));
    }
  }

  private routeSubscribe() {
    this.editCurrencyId = this.route.snapshot.paramMap.get('id');
  }


  ngOnDestroy() {
    if (this.updateCurrencySubscription) {
      this.updateCurrencySubscription.unsubscribe();
    }
  }

}
