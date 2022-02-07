/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { patternValidator } from '../../../../../../../core/admin/providers/patternValidator';
import { UserSandbox } from '../../../../../../../core/admin/settings/user/user.sandbox';
import { UserService } from '../../../../../../../core/admin/settings/user/user.service';

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
export class UserAddComponent implements OnInit {
  @Input() userlist: any;
  public user: FormGroup;
  public submitted = false;
  public firstName: FormControl;
  public lastName: FormControl;
  public email: FormControl;
  public role: FormControl;
  public username: FormControl;
  public password: FormControl;
  private valid: boolean;
  public pageSize = 5;
  private keyword: any = '';
  public id: any = '';
  private offset: any;
  public UserInfo: any = [];
  private update_UserId: boolean;
  private servicedata: any;
  public updatetitle: any;
  private edituserId: any;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    public sandbox: UserSandbox,
    private router: Router,
    public service: UserService
  ) {}

  /**
   *initially  calls editUserList,getuserGrouplist with argument(this.offset, this.keyword),
   *  initForm
   * */
  ngOnInit() {
    this.UserInfo = [];
    this.update_UserId = false;
    this.edituserId = this.route.snapshot.paramMap.get('id');

    this.editUserList();
    if (this.UserInfo && this.UserInfo[0]) {
      this.update_UserId = true;
    }
    this.getuserGrouplist(this.offset, this.keyword);
    this.initForm();
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  // FORM GROUP
  initForm() {
    const emailRegex =
      '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@' +
      '[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';

    this.user = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(emailRegex),
          Validators.minLength(5)
        ])
      ],
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(emailRegex),
          Validators.minLength(5)
        ])
      ],
      role: ['', Validators.required],
      password: [
        '',
        this.conditionalValidator(
          () => this.update_UserId === false,
          Validators.required
        )
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
    if (this.UserInfo && this.UserInfo[0] && this.UserInfo[0].userId) {
      params.userID = this.UserInfo[0].userId;
      this.sandbox.updateUser(params);
      this.service.setdata('');
    } else {
      this.sandbox.addUser(params);
    }
  }

  // DROP DOWN ROLE LIST
  getuserGrouplist(offset: number = 0, keyword) {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    params.count = '';
    params.status = 1;
    this.sandbox.getUserGrouplist(params);
  }

  // CANCLE
  UserCancle() {
    this.UserInfo = ' ';
    this.service.setdata(this.UserInfo);
    this.router.navigate(['/settings/user']);
  }

  // UPDATE
  editUserList() {
    this.servicedata = this.service.getdata();
    if (this.servicedata) {
      this.UserInfo.push(this.servicedata);
      this.update_UserId = false;
    }
    if (this.UserInfo && this.UserInfo[0]) {
      this.update_UserId = false;
      if (this.edituserId) {
        for (let i = 0; i < this.UserInfo.length; i++) {
          this.updatetitle = 1;
          this.firstName = this.UserInfo[0].firstName;
          this.lastName = this.UserInfo[0].lastName;
          this.email = this.UserInfo[0].email;
          this.username = this.UserInfo[0].username;
          if (this.UserInfo[0] && this.UserInfo[0].usergroup) {
            this.role = this.UserInfo[0].usergroup.groupId;
          }
        }
      }
    }
  }

  // VALIDATION
  get f() {
    return this.user.controls;
  }
}
