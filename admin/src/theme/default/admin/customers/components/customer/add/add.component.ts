/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
import { patternValidator } from '../../../../../../../core/admin/providers/patternValidator';

@Component({
  selector: 'app-customer-add',
  templateUrl: 'add.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #009efb;
        color: white;
      }

      .dark-modal .close {
        color: white;
      }

      .light-blue-backdrop {
        background-color: #5cb3fd;
      }

      .image-manager .modal-dialog {
        max-width: 70%;
      }

      input[type='number']::-webkit-inner-spin-button,
      input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      mat-checkbox-layout {
        margin-bottom: -73px !important;
        margin-left: -70px !important;
      }
    `
  ]
})
export class CustomerAddComponent implements OnInit {
  // formgroup variable
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
  private EditCustomerId: any;
  private closeResult: string;
  public myValue: boolean;

  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private modalService2: NgbModal,
    private router: Router,
    public fb: FormBuilder,
    public appSandbox: CustomerSandbox,
    private service: CustomersApiClientService,
  ) {}

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
    this.customersGroupList();
    this.myValue = true;
    this.EditCustomerId = this.route.snapshot.paramMap.get('id');
    this.update_CustId_PSW = true;
    this.update_CustId_CPSW = true;
    this.submitted = false;

    this.editcustomerinfo();
    if (this.customerInfo && this.customerInfo[0]) {
    } else {
    }
    this.initForm();
  }

  customersGroupList() {
    const param: any = {};
    param.limit = '';
    param.offset = '';
    param.keyword = '';
    param.count = '';
    console.log(param, 'rathu');
    this.appSandbox.customersGroupList(param);
  }

  // cancel form Submit
  addCustCancle() {
    this.router.navigate(['/customers/customer']);
  }

  // initial customerform form created
  initForm() {
    const emailRegex =
      '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@' +
      '[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
    const nameRegex = '[a-zA-Z ]*';
    this.customerForm = this.fb.group(
      {
        customerGroup: ['', [Validators.required]],
        customerName: [
          null,
          [Validators.required, Validators.pattern(nameRegex)]
        ],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(emailRegex),
            Validators.minLength(5)
          ])
        ],
        telephone: [
          '',
          [
            Validators.required,
            Validators.minLength(0),
            Validators.maxLength(15)
          ]
        ],
        password: [
          '',
          this.conditionalValidator(
            () => this.update_CustId_PSW === true,
            Validators.required
          )
        ],
        confirmpassword: [
          '',
          this.conditionalValidator(
            () => this.update_CustId_CPSW === true,
            Validators.required
          )
        ],
        status: ['', [Validators.required]],
        // newsletter: [''],
        mailStatus: ['', [Validators.required]]
      },
      { validator: this.matchingPasswords('password', 'confirmpassword') }
    );
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
    if (this.customerForm.invalid) {
      return;
    }
    const params: any = {};
    params.customerGroupId = this.customerForm.value.customerGroup;
    params.username = this.customerForm.value.customerName;
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
    // params.newsletter = this.customerForm.value.newsletter;
    if (this.customerInfo && this.customerInfo[0].id) {
      params.id = this.customerInfo[0].id;
      this.appSandbox.updateCustomers(params);
    } else {
      this.appSandbox.addCustomers(params);
    }
  }

  // edit (for updating purpose ) the customerForm
  editcustomerinfo() {
    this.serviceEditinfo = this.service.getcusteditdata();
    if (this.serviceEditinfo) {
      this.customerInfo.push(this.serviceEditinfo);
      this.update_CustId_CPSW = false;
      this.update_CustId_PSW = false;
    } else {
    }
    if (this.customerInfo && this.customerInfo[0]) {
      for (let i = 0; i < this.customerInfo.length; i++) {
        if (this.EditCustomerId) {
          if (this.customerInfo[0].mailStatus === 1) {
            this.myValue = true;
          } else {
            this.myValue = false;
          }
          this.customerGroup = this.customerInfo[0].username;
          this.customerName = this.customerInfo[0].firstName;
          this.email = this.customerInfo[0].email;
          this.telephone = this.customerInfo[0].mobileNumber;
          this.newsletter = this.customerInfo[0].newsletter;
          this.status = this.customerInfo[0].isActive;
          this.mailStatus = this.customerInfo[0].mailStatus;
          this.customerGroup = this.customerInfo[0].customerGroupId;
        }
      }
    } else {
      this.customerInfo = ' ';
    }
  }

  // A property 'f' using in valdiation control in template
  get f() {
    return this.customerForm.controls;
  }
}
