/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// Angular Imports 
import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { UntypedFormBuilder,UntypedFormGroup, Validators, UntypedFormControl} from '@angular/forms';
import { Router } from '@angular/router';
// Third Party Imports
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
// Sandbox
import { FailedOrderSandbox } from '../../../../../../../../src/core/admin/sales/failed-order/failed-order-sandbox';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-failed-order-model',
  templateUrl: './failed-order-model.component.html',
  styleUrls: ['./failed-order-model.component.scss'],
})
export class FailedOrderModalComponent implements OnInit, AfterViewChecked {

  public params: any;
  public failedOrderForm: UntypedFormGroup;
  private subscriptions: Array<Subscription> = [];
  public submittedValues = false;
  public paymentId: any = '';
  public paymentSelected = false;
  public imageUrl:any;

  constructor(
    private activeModal: NgbActiveModal,
    public fb: UntypedFormBuilder,
    public sandbox: FailedOrderSandbox,
    private cdr: ChangeDetectorRef,
    public router: Router
  ) {}

  ngOnInit() {
    this.imageUrl= environment.imageUrl
    this.initForm();
    this.getPaymentList();
  }

  ngAfterViewChecked() { this.cdr.detectChanges(); }

  initForm() {
    this.failedOrderForm = this.fb.group({
          paymentRefId: [''],
          paymentStatus: [null, Validators.required],
          paymentDetails: ['']
    });
  }

  getPaymentList() {
    const params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.count = 0;
    params.keyword = 'payment';
    this.sandbox.getPaymentList(params);
  }

  getPaymentId(list) {
    this.paymentId = list.id;
    this.paymentSelected = true;

  }

  submit() {
    this.submittedValues = true;
    if (!this.failedOrderForm.valid) {
      this.validateAllFormFields(this.failedOrderForm);
      return;
    }
    if (this.paymentId === '') {
       this.paymentSelected = false;
       return;
    }
     const params: any = {};
     params.orderId = this.params.orderId;
     params.paymentStatus = +this.failedOrderForm.value.paymentStatus;
     params.paymentMethod	 = this.paymentId;
     params.paymentRefId = this.failedOrderForm.value.paymentRefId;
     params.paymentDetail	 = this.failedOrderForm.value.paymentDetails;
     this.sandbox.moveToMainOrder(params);
     this.subscriptions.push(this.sandbox.moveToMainOrder$.subscribe(data => {
       if (data && data.status === 1) {
         this.close();
        //  this.router.navigate(['/vendors/manage-sales/sales/order']);
       }
     }));
  }

  validateAllFormFields(formGroup: UntypedFormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  close() {
    this.activeModal.close();
  }
}
