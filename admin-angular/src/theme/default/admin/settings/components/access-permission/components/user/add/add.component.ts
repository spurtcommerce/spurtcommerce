/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, ViewEncapsulation, Input, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { patternValidator } from '../../../../../../../../../core/admin/providers/patternValidator';
import { UserSandbox } from '../../../../../../../../../core/admin/settings/user/user.sandbox';
import { UserService } from '../../../../../../../../../core/admin/settings/user/user.service';
import { CustomValidators } from '../../../../../../shared/components/interface/custom-password-validation';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-spurt-settings-user-add',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'add.component.html',
  styles: [
    `
      .settings-right-wrapper {
        margin-top: 0px !important;
      }

      .setting1-inner-header {
        margin-top: 40px !important;
      }
    `
  ]
})
export class UserAddComponent implements OnInit, OnDestroy {


  @Input() userlist: any;
  @Input() edit: any;
  @Input() id: any;
  public user: FormGroup;
  public submitted = false;
  public firstName: FormControl;
  public lastName: FormControl;
  public email: FormControl;
  public role: FormControl;
  public username: FormControl;
  public password: FormControl;
  private valid: boolean;
  public pageSize = 10;
  private keyword: any = '';
  private offset: any;
  public userInfo: any = [];
  private updateUserId: boolean;
  private serviceData: any;
  public updateTitle: any;
  private editUserId: any = '';
  public enteredPassword: any = '';
  private subscriptions: Array<Subscription> = [];

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    public sandbox: UserSandbox,
    private router: Router,
    public service: UserService,
    public modalService: NgbActiveModal
  ) {}

  /**
   *initially  calls editUserList,getUserGroupList with argument(this.offset, this.keyword),
   *  initForm
   * */
  ngOnInit() {
    this.initForm();
    this.getUserGroupList(this.offset, this.keyword);
    this.subscribe();
    this.userInfo = [];
    this.updateUserId = false;

    if (this.userInfo && this.userInfo[0]) {
      this.updateUserId = true;
    }
  }

  subscribe() {
     this.subscriptions.push(this.sandbox.getGroupRoleList$.subscribe(data => {
       if (data && data.length > 0) {
         if (this.edit === 'edit') {
          this.editUserList();
         }
       }
     }));
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  close() {
    this.modalService.close('close');
  }

  // FORM GROUP
  initForm() {
    const emailRegex =
      '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@' +
      '[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
      const nameValidationPattern = '[a-zA-Z \'-,;.]*';


    this.user = this.fb.group({

      firstName: ['', Validators.compose([
          Validators.required,
          Validators.pattern(nameValidationPattern),
          Validators.minLength(3),
          Validators.maxLength(32)
        ])],
        lastName: ['', Validators.compose([
          Validators.required,
          Validators.pattern(nameValidationPattern),
          Validators.maxLength(32)
        ])],
      email: ['', Validators.compose([
          Validators.required,
          Validators.pattern(emailRegex),
          Validators.email,
          Validators.maxLength(96)
        ])
      ],
      username: ['', Validators.compose([
          Validators.required,
          Validators.pattern(emailRegex),
          Validators.maxLength(32)
        ])
      ],
      role: [null, Validators.required],
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
      ]
    });
  }

  // Conditional Validator
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
   * Handles form onSubmit .calls sandbox updateUser and addUser if valid.
   *
   * @param user from entire form.
   * */
  onSubmit(user) {
    this.submitted = true;

    if (this.edit === 'edit') {
      if (this.enteredPassword !== '') {
        this.user.controls['password'].setValidators(
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
        this.user.controls['password'].updateValueAndValidity();
      } else {
        this.user.controls['password'].clearValidators();
        this.user.controls['password'].updateValueAndValidity();
      }
    }



    if (this.user.invalid) {
      return;
    }
    const params: any = {};
    params.firstName = this.user.value.firstName;
    params.lastName = this.user.value.lastName;
    params.email = this.user.value.email;
    params.role = this.user.value.role;
    params.username = this.user.value.username;
    params.password = this.user.value.password;
    if (this.userInfo && this.userInfo[0] && this.userInfo[0].userId) {
      params.userID = this.userInfo[0].userId;
      this.sandbox.updateUser(params);
      this.modalService.close('close');
      this.service.setdata('');
    } else {
      this.sandbox.addUser(params);
      this.modalService.close('close');
    }
  }


  enterPassword(val) {
    this.enteredPassword = val;
  }

  // DROP DOWN ROLE LIST
  getUserGroupList(offset: number = 0, keyword) {
    const params: any = {};
    params.limit = 0;
    params.offset = offset;
    params.keyword = this.keyword;
    params.count = '';
    params.status = 1;
    this.sandbox.getUserGroupList(params);
  }

  // CANCLE
  UserCancle() {
    this.userInfo = ' ';
    this.service.setdata(this.userInfo);
    this.modalService.close('close');
  }

  // UPDATE
  editUserList() {
    this.serviceData = this.service.getdata();
    if (this.serviceData) {
      this.userInfo.push(this.serviceData);
      this.updateUserId = false;
    }
    if (this.userInfo && this.userInfo[0]) {
      this.updateUserId = false;
      if (this.edit === 'edit') {
        for (let i = 0; i < this.userInfo.length; i++) {
          this.updateTitle = 1;
          this.firstName = this.userInfo[0].firstName;
          this.lastName = this.userInfo[0].lastName;
          this.email = this.userInfo[0].email;
          this.username = this.userInfo[0].username;
          if (this.userInfo[0] && this.userInfo[0].usergroup) {
            this.role = this.userInfo[0].usergroup.groupId;
          }
        }
      }
    }
  }

  // VALIDATION
  get f() {
    return this.user.controls;
  }

  ngOnDestroy() {
    this.sandbox.clearVariable();
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
