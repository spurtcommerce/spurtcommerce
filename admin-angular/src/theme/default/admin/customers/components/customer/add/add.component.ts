/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import {
  ModalDismissReasons,
  NgbModal,
  NgbPanelChangeEvent
} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { CustomerSandbox } from '../../../../../../../core/admin/Customers/customers/customer.sandbox';
import { CustomersApiClientService } from '../../../../../../../core/admin/Customers/customers/customer.ApiClient.service';
import { Subscription } from 'rxjs';
import { CustomValidators } from '../../../../shared/components/interface/custom-password-validation';


@Component({
  selector: 'app-customer-add',
  templateUrl: 'add.component.html',
  styleUrls: ['add.component.scss'],
  encapsulation: ViewEncapsulation.None,


})
export class CustomerAddComponent implements OnInit, OnDestroy {

  public customerForm: FormGroup;
  public mailStatus: FormControl;
  public customerGroup: FormControl;
  public customerName: FormControl;
  public email: FormControl;
  public telephone: FormControl;
  public password: FormControl;
  public confirmpassword: FormControl;
  public newsletter: FormControl;
  public status: FormControl;

  // Variable
  public submitted = false;
  public customerInfo: any = [];
  private serviceEditinfo: any;
  private update_CustId_PSW: boolean;
  private update_CustId_CPSW: boolean;
  private editCustomerId: any = '';
  private closeResult: string;
  public myValue: boolean;
  private subscriptions: Array<Subscription> = [];
  public enteredPassword: any = '';
  public mailCheckBox = false;
  public queryDetails: any = {};

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private modalService2: NgbModal,
    private router: Router,
    public fb: FormBuilder,
    public appSandbox: CustomerSandbox,
    private service: CustomersApiClientService,
  ) {
    const offset = this.route.snapshot.queryParamMap.get('offset');
    const index = this.route.snapshot.queryParamMap.get('index');

    this.queryDetails.offset = offset || 0;
    this.queryDetails.index = index || 0;

  }

  // style purpose using
  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  // style purpose using
  open2(content) {
    this.modalService
      .open(content, { windowClass: 'image-manager' })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  // style purpose using
  open(content) {
    this.modalService2.open(content, {
      windowClass: 'dark-modal,image-manager'
    });
  }

  // style purpose using
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // intially calls editcustomerinfo,initForm
  ngOnInit(): void {
    this.myValue = true;
    this.editCustomerId = this.route.snapshot.paramMap.get('id') ? this.route.snapshot.paramMap.get('id') : '';
    this.update_CustId_PSW = true;
    this.update_CustId_CPSW = true;
    this.submitted = false;
    this.initForm();
    if (this.editCustomerId !== '') {
      this.update_CustId_PSW = false;
      this.update_CustId_CPSW = false;
    }
    // this.customersGroupList();
  }

  // customersGroupList() {
  //   const param: any = {};
  //   param.limit = 0;
  //   param.offset = 0;
  //   param.keyword = '';
  //   param.count = '';
  //   param.status = 1;
  //   this.sandbox.customersGroupList(param);

  //   this.subscriptions.push(this.sandbox.getCustomersGroupList$.subscribe(data => {
  //     if (data && data.length > 0) {
  //       if (this.editCustomerId) {
  //         this.appSandbox.viewCustomerDetail({ id: this.editCustomerId });
  //         this.editcustomerinfo();
  //       }
  //     }
  //   }));
  // }

  // cancel form Submit
  cancel() {
    this.router.navigate(['/customers/customer'], { queryParams: this.queryDetails });
  }

  // initial customerform form created
  initForm() {
    const emailRegex =
      '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@' +
      '[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
    const nameValidationPattern = '[a-zA-Z \'-,;.]*';

    this.customerForm = this.fb.group(
      {
        customerGroup: [null, [Validators.required]],
        customerName: [
          null, Validators.compose([
            Validators.required,
            Validators.pattern(nameValidationPattern),
            Validators.minLength(3),
            Validators.maxLength(32)
          ])],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(emailRegex),
            Validators.maxLength(96)
          ])
        ],
        telephone: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(15)
          ]
        ],
        password: [
          '',
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/((?=.*\d)|(?=.*[#$^+=!*()@%&]))/, { hasNumber: true }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
            // check whether the entered password has a lower-case letter
            CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
            // Has a minimum length of 8 characters
            Validators.minLength(8),
            Validators.maxLength(50)
          ]),
        ],
        confirmpassword: [
          '',
          this.conditionalValidator(
            () => this.update_CustId_CPSW === true, Validators.required
          )
        ],
        status: [null, [Validators.required]],
        mailStatus: [true, [Validators.requiredTrue]]
      },
      { validator: this.matchingPasswords('password', 'confirmpassword') }
    );
  }

  updateForm() {
    this.customerForm.controls['password'].clearValidators();
    this.customerForm.controls['password'].updateValueAndValidity();

    this.customerForm.controls['confirmpassword'].clearValidators();
    this.customerForm.controls['confirmpassword'].updateValueAndValidity();
  }

  enterPassword(val) {
    this.enteredPassword = val;
  }

  keyPress(event: any) {
    const pattern = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  /**
   * Handles form 'matchingPasswords' event. for conformation password.
   * @param passwordKey for password value
   * @param passwordConfirmationKey for Repassword value
   */
  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const passwordConfirmation = group.controls[passwordConfirmationKey];
      if (password.value !== passwordConfirmation.value) {
        return passwordConfirmation.setErrors({ mismatchedPasswords: true });
      }
    };
  }

  // A function using password validation purpose
  conditionalValidator(
    condition: () => boolean,
    validator: ValidatorFn
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!condition()) {
        return null;
      }
      return validator(control);
    };
  }

  /**
   * Handles form 'onSubmit' event . Calls sandbox addCustomers(for add customer)function and updateCustomers(for update Customer)
   * @param customerForm entire form value
   * @param params storing entire form value
   */
  onSubmit() {
    this.submitted = true;


    if (this.editCustomerId !== '') {
      if (this.enteredPassword !== '') {
        this.customerForm.controls['password'].setValidators(
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/((?=.*\d)|(?=.*[#$^+=!*()@%&]))/, { hasNumber: true }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
            // check whether the entered password has a lower-case letter
            CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
            // Has a minimum length of 8 characters
            Validators.minLength(8),
            Validators.maxLength(50)
          ]),
        );
        this.customerForm.controls['password'].updateValueAndValidity();
      } else {
        this.updateForm();
      }
    }

    if (this.customerForm.invalid) {
      return;
    }
    const params: any = {};
    params.customerGroupId = this.customerForm.value.customerGroup;
    params.firstName = this.customerForm.value.customerName;
    params.email = this.customerForm.value.email;
    params.mobileNumber = this.customerForm.value.telephone;
    params.password = this.customerForm.value.password;
    params.confirmPassword = this.customerForm.value.confirmpassword;
    params.mailStatus = this.customerForm.value.mailStatus;
    if (this.customerForm.value.mailStatus === true) {
      params.mailStatus = 1;
    } else {
      params.mailStatus = 0;
    }
    params.avatar = '';
    params.status = this.customerForm.value.status;
    if (this.editCustomerId) {
      params.id = this.editCustomerId;
      this.appSandbox.updateCustomers(params);
    } else {
      this.appSandbox.addCustomers(params);
    }
    this.subscripe();

  }

  subscripe() {
    this.subscriptions.push(
      this.appSandbox.addCustomer$.subscribe(data => {
        if (data && data.status === 1) {
          this.router.navigate(['/customers/customer'], { queryParams: this.queryDetails });
        }
      })
    );
    this.subscriptions.push(
      this.appSandbox.updateCustomer$.subscribe(data => {
        if (data && data.status === 1) {
          this.router.navigate(['/customers/customer'], { queryParams: this.queryDetails });
        }
      })
    );
  }

  // edit (for updating purpose ) the customerForm

  editcustomerinfo() {
    this.subscriptions.push(this.appSandbox.getDetailCustomer$.subscribe(data => {
      if (data && Object.keys(data).length) {
        this.setCustomerInfo(data);
      }
    }));
  }

  setCustomerInfo(details) {
    if (details) {
      this.customerForm.controls['customerName'].setValue(details.firstName);
      this.customerForm.controls['email'].setValue(details.email);
      this.customerForm.controls['telephone'].setValue(details.mobileNumber);
      this.customerForm.controls['status'].setValue(details.isActive);

      if (details.mailStatus === 0) {
        this.customerForm.controls['mailStatus'].setValue(false);
        this.mailCheckBox = false;
      } else {
        this.customerForm.controls['mailStatus'].setValue(true);
        this.mailCheckBox = true;
      }
      this.customerForm.controls['customerGroup'].setValue(details.customerGroupId);
    }
  }

  // A property 'f' using in valdiation control in template
  get f() {
    return this.customerForm.controls;
  }

  changeMailStatus(event) {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
