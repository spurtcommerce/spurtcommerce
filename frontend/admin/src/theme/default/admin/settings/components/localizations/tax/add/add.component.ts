/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// angular imports 
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Validators,
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormBuilder
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

// third party
import { of, Subscription, } from 'rxjs';
import { switchMap, take,delay } from 'rxjs/operators';

//Sandbox and services 
import { TaxSandbox } from '../../../../../../../../core/admin/settings/localizations/tax/tax.sandbox';
import { TaxService } from '../../../../../../../../core/admin/settings/localizations/tax/tax.service';
import { objForm } from './add.constant';
import { getFormControlsFieldsObj, getTypes } from 'src/theme/default/admin/shared/components/common-form/common-form.constant';


@Component({
  selector: 'app-spurt-taxadd',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class TaxAddComponent implements OnInit,OnDestroy {

  // Form 
  public taxForm: UntypedFormGroup;
  public title: UntypedFormControl;
  public value: UntypedFormControl;
  public status: UntypedFormControl;

  // List 
  private params: any = {};
  private editedValueTax: any = {};
  public taxId: number;
  private editTaxId: string;

  //Validation
  public submitted = false;
  public rupeeError = [];

  _Object=Object;
  // Reusable form 
  dynamicObjControls: any = {};
 formObjFormGroup: any;

//  Subscription
 private updateTaxSubscription: Subscription;


  constructor(
    public modalService: NgbActiveModal,
    private fb: UntypedFormBuilder,
    private sandbox: TaxSandbox,
    private route: ActivatedRoute,
    private taxService: TaxService,
    private router: Router,
    public titleService: Title
  ) {
    this.titleService.setTitle('Settings | Localization');
  }


  // initially calls loadForm,editTaxForm
  ngOnInit() {
    this.buildForm();
   
  }

    // intialize form
    private buildForm(): void {
      const formObjModel = objForm;
      const formGroupField = getFormControlsFieldsObj(formObjModel);
      this.formObjFormGroup = this.fb.group(formGroupField);
      Object.keys(formObjModel).forEach((element: any) => {
        this.dynamicObjControls[element] = getTypes(formObjModel[element], this.formObjFormGroup);
      });
      this.intializeFunction()
    }

  // Submit
  onSubmit() {
    this.submitted = true;
    if (!this.formObjFormGroup.valid) {
      return;
    }
    const param:any={};
    param.title = this.formObjFormGroup.value.title;
    param.code = this.formObjFormGroup.value.code;
    param.symbolLeft = this.formObjFormGroup.value.symbolLeft;
    param.symbolRight = this.formObjFormGroup.value.symbolRight;
    param.value = this.formObjFormGroup.value.value;
    param.status = this.formObjFormGroup.value.status;
    if (this.editedValueTax) {
      param.taxId = this.editedValueTax.taxId;
     this.sandbox.updateTax(param);
    this.updateTaxSubscription=this.sandbox.taxUpdate$.subscribe((val: any) => { 
   if(val && val.status === 1){
    this.modalService.close('clear');
   }
              
      });
    } else {
      this.sandbox.addtax(param);
      this.updateTaxSubscription=this.sandbox.taxNew$.subscribe((val:any) => {
        if (val?.status == 1) {
            this.modalService.close('clear');
        }
      });
    }

  }


  // navigate to tax component
  close() {
    this.modalService.close('close');
  }


  cancel() {
    this.taxService.setEditedValue('');
    this.router.navigate(['/settings/local/tax']);
  }


  // number only event
  numberOnly(event): boolean {
    const percentage = event.target.value + event.key;

    if (percentage > 100) {
      return false;
    }
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }



  // intialze function 
  private intializeFunction() {
    this.editTaxId = this.route.snapshot.paramMap.get('id');
      this.editTaxForm();
   
  }


  // Assign editedValueTax values  in reactive form
  private editTaxForm() {
    this.editedValueTax = this.taxService.getEditedValue();
    if (this.editedValueTax) {
      this.taxId = this.editedValueTax.taxId;
      this.formObjFormGroup.controls['title'].setValue(this.editedValueTax.title);
      this.formObjFormGroup.controls['value'].setValue(this.editedValueTax.value);
      this.formObjFormGroup.controls['status'].setValue(String(this.editedValueTax.isActive));
    }
  }

  ngOnDestroy() {
    if (this.updateTaxSubscription) {
      this.updateTaxSubscription.unsubscribe();
    }
  }
}
