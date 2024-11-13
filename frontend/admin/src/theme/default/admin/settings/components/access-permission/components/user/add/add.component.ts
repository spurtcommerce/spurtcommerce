/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
 * Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
// angular imports
import {
  Component,
  ViewEncapsulation,
  Input,
  OnInit,
  OnDestroy,
} from "@angular/core";
import {
  NgbActiveModal,
} from "@ng-bootstrap/ng-bootstrap";
import {
  Validators,
  UntypedFormGroup,
  FormControl,
  UntypedFormBuilder,
  ValidatorFn,
  AbstractControl,
} from "@angular/forms";
// Sandbox and services
import { UserSandbox } from "../../../../../../../../../core/admin/settings/user/user.sandbox";
import { UserService } from "../../../../../../../../../core/admin/settings/user/user.service";
// Custom validators
import { CustomValidators } from "../../../../../../shared/components/interface/custom-password-validation";
// third party import
import { Subscription } from "rxjs";
import { formFields } from "./add.constant";
import { getFormControlsFields, getTypes } from "src/theme/default/admin/shared/components/common-form/common-form.constant";
@Component({
  selector: "app-spurt-settings-user-add",
  encapsulation: ViewEncapsulation.None,
  templateUrl: "add.component.html",
  styles: [
    `
      .settings-right-wrapper {
        margin-top: 0px !important;
      }

      .setting1-inner-header {
        margin-top: 40px !important;
      }
    `,
  ],
  styleUrls: ["./add.component.scss"],
})
export class UserAddComponent implements OnInit, OnDestroy {
  // Subscription class
  private subscriptions: Array<Subscription> = [];
  // Decorators
  @Input() userlist: any;
  @Input() edit: any;
  @Input() id: any;

  // Reusable form
  _Object = Object;
  dynamicObjControls: any = {};
  private formObjFormGroup: UntypedFormGroup;
  // List
  public pageSize = 10;
  private keyword: any = "";
  private offset: any;
  public userInfo: any = [];
  private serviceData: any;
  public updateTitle: any;
  public enteredPassword: any = "";
  public groupList: any = [];

  // Validations
  public submitted = false;
  private valid: boolean;
  private updateUserId: boolean;
  // Arrow functions
  trackByIndex = (index: number): number => index;

  constructor(
    public fb: UntypedFormBuilder,
    public sandbox: UserSandbox,
    public service: UserService,
    public modalService: NgbActiveModal
  ) { }

  /**
   *initially  calls editUserList,getUserGroupList with argument(this.offset, this.keyword),
   *  initForm
   * */
  ngOnInit() {
    //build Form
    this.buildForm();
    this.formObjFormGroup.get('email')?.valueChanges.subscribe((val) => {
      this.formObjFormGroup.controls.username.setValue(
        val
      );
      this.formObjFormGroup.get('username')?.disable();
    })
    // this.initForm();
    this.getUserGroupList(this.offset, this.keyword);
    this.subscribe();
    this.routeSubscribe();
  }

  subscribe() {
    this.sandbox.getUserGroupList({});
    this.subscriptions.push(
      this.sandbox.getGroupRoleList$.subscribe((data) => {
        if (data && data.length > 0) {
          if (this.edit === "edit") {
            this.editUserList();
          }
        }
      })
    );
  }



  close() {
    this.modalService.close("close");
  }

  /**
   * Handles form onSubmit .calls sandbox updateUser and addUser if valid.
   *
   * @param user from entire form.
   * */
  onSubmit() {
    this.submitted = true;

    if (this.formObjFormGroup.invalid) {
      return;
    }
    const params: any = {};
    params.firstName = this.formObjFormGroup.value.firstName;
    params.lastName = this.formObjFormGroup.value.lastName;
    params.email = this.formObjFormGroup.value.email;
    params.role = this.formObjFormGroup.value.role;
    params.username = this.formObjFormGroup.value.email;
    if ([null, '', undefined].includes(this.formObjFormGroup.value.password)) {
      params.password = this.userInfo[0].password
    } else {
      params.password = this.formObjFormGroup.value.password;
    }
    if (this.userInfo && this.userInfo[0] && this.userInfo[0].userId) {
      params.userID = this.userInfo[0].userId;
      this.sandbox.updateUser(params);
      this.sandbox.getUpdateUser$.subscribe(val=>{
        if(val?.status == 1){
          this.modalService.close("remove");
          this.service.setdata("");
        }
      })
      
    } else {
      this.sandbox.addUser(params);
      this.sandbox.getAddUser$.subscribe(val=>{
        if(val?.status == 1){
          this.modalService.close("remove");
        }
      })
      
    }
  }

  enterPassword(val) {
    this.enteredPassword = val;
  }
  // CANCLE
  UserCancle() {
    this.userInfo = " ";
    this.service.setdata(this.userInfo);
    this.modalService.close("close");
  }

  // UPDATE
  editUserList() {
    if (this.serviceData) {
      this.userInfo.push(this.serviceData);
      this.updateUserId = false;
    }
    if (this.userInfo && this.userInfo[0]) {
      this.updateUserId = false;
      if (this.edit === "edit") {
        for (let i = 0; i < this.userInfo.length; i++) {
          this.formObjFormGroup.patchValue({
            firstName: this.userInfo[0].firstName,
            lastName: this.userInfo[0].lastName,
            email: this.userInfo[0].email,
            username: this.userInfo[0].username,
            role: this.userInfo[0].usergroup.groupId ?? this.userInfo[0]?.username
          });
          this.updateTitle = 1;
        }
      }
    }
  }


  private getUserGroupList(offset: number = 0, keyword) {
    const params: any = {};
    params.limit = 0;
    params.offset = offset;
    params.keyword = this.keyword;
    params.count = 0;
    params.status = 1;
    this.service.userGrouplist(params).subscribe((data) => {
      if (data != undefined) {
        this.groupList = data.data;
        formFields.Role.customData.data = this.groupList;
      }
    });
  }
  private routeSubscribe() {
    this.userInfo = [];
    this.updateUserId = false;

    if (this.userInfo && this.userInfo[0]) {
      this.updateUserId = true;
    }
  }
  // Intialize form
  private buildForm(): void {
    const formObjModel = formFields;
    const formGroupField = getFormControlsFields(formObjModel);
    this.formObjFormGroup = this.fb.group(formGroupField);
    Object.keys(formObjModel).forEach((element: any) => {
      this.dynamicObjControls[element] = getTypes(formObjModel[element], this.formObjFormGroup);
    });
    this.serviceData = this.service.getdata();
    if (![null, '', undefined].includes(this.serviceData)) {
      this.formObjFormGroup.get('password').clearValidators();
    }
  }

  ngOnDestroy() {
    this.sandbox.clearVariable();
    this.subscriptions.forEach((each) => each.unsubscribe());
  }
}
